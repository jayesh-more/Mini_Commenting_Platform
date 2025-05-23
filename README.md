# Mini_Commenting_Platform

# Mini Commenting Platform

A simple full-stack commenting platform built with **Angular** (frontend) and **FastAPI** (backend) using **MongoDB** for persistent storage.


## Features

- User registration and login (with validation)
- View comments (nested up to 2 levels)
- Add new comments and replies
- Delete your own comments
- All data stored and managed in MongoDB
- Responsive, modern UI with clear feedback


## What I Learned

- How to build a full-stack app using Angular and FastAPI
- Integrating Angular forms with validation and user feedback
- Connecting FastAPI to MongoDB using PyMongo
- Structuring RESTful API endpoints for authentication and CRUD operations
- Handling CORS and cross-origin requests in a real-world setup
- Managing state and navigation in Angular


## What Parts Were Hard

- Ensuring the frontend and backend data models matched, especially with MongoDB's `_id` fields
- Debugging CORS and connection issues between Angular and FastAPI
- Handling form validation and error feedback for both login and registration
- Making sure the UI updates in real-time after comment actions
- Managing nested comments and replies in a flat data structure

## What I'd Improve If Given More Time

- Add JWT authentication and protect comment endpoints
- Add user roles (admin/user) and allow admin to delete any comment
- Improve error handling and user feedback throughout the app
- Add upvote/downvote functionality for comments
- Add pagination or infinite scroll for large comment threads
- Deploy the app to a cloud platform (e.g., Vercel/Netlify for frontend, Render for backend)
- Write unit and integration tests for both frontend and backend



## How to Run

1. **Backend:**  
   - Install Python dependencies: `pip install fastapi pymongo uvicorn`
   - Start MongoDB locally or use MongoDB Atlas
   - Run: `uvicorn app:app --reload` from the `backend/comment-api` folder

2. **Frontend:**  
   - Install Node dependencies: `npm install`
   - Run: `ng serve` or `npm start` from the `commenting-platform` folder

3. **Access the app:**  
   - Open [http://localhost:4200](http://localhost:4200) in your browser


