from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection (update the URI as needed)
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["mini_commenting_platform"]
comments_collection = db["comments"]
users_collection = db["users"]

class Comment(BaseModel):
    id: Optional[str]
    content: str
    parent_id: Optional[str] = None
    author: str

class LoginRequest(BaseModel):
    username: str
    password: str

# Helper to convert MongoDB document to dict
def comment_doc_to_dict(doc):
    return {
        "id": str(doc["_id"]),
        "content": doc["content"],
        "parent_id": doc.get("parent_id"),
        "author": doc["author"]
    }

@app.on_event("startup")
def ensure_collections():
    # Insert a dummy doc and remove it to ensure collections exist
    if users_collection.count_documents({}) == 0:
        users_collection.insert_one({"username": "user123", "password": "pass123"})
        users_collection.delete_one({"username": "user123"})
    if comments_collection.count_documents({}) == 0:
        comments_collection.insert_one({"content": "init", "author": "init"})
        comments_collection.delete_one({"content": "init", "author": "init"})

@app.post("/login")
async def login(data: LoginRequest):
    user = users_collection.find_one({"username": data.username, "password": data.password})
    if user:
        return {"token": "dummy-token", "username": data.username}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/comments")
async def get_comments():
    comments = list(comments_collection.find())
    return [comment_doc_to_dict(c) for c in comments]

@app.post("/comments")
async def create_comment(comment: Comment):
    doc = {
        "content": comment.content,
        "parent_id": comment.parent_id,
        "author": comment.author
    }
    result = comments_collection.insert_one(doc)
    doc["_id"] = result.inserted_id
    return comment_doc_to_dict(doc)

@app.delete("/comments/{comment_id}")
async def delete_comment(comment_id: str):
    result = comments_collection.delete_one({"_id": ObjectId(comment_id)})
    if result.deleted_count == 1:
        return {"message": "Comment deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Comment not found")

# Optional: Endpoint to create a user for testing
@app.post("/register")
async def register(data: LoginRequest):
    if users_collection.find_one({"username": data.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    users_collection.insert_one({"username": data.username, "password": data.password})
    return {"message": "User registered"}