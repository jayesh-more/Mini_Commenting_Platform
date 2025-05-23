import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comment {
  id: string;
  content: string;
  parent_id?: string;
  author: string;
  created_at?: string; // Add this field
}

@Injectable({ providedIn: 'root' })
export class CommentService {
  // Use localhost instead of 127.0.0.1 for better compatibility
  apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Fixed login method: send credentials in body, not as query params
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiUrl}/login`,
      body,
      { headers }
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/comments/${id}`);
  }
}