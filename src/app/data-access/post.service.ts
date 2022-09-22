import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: string;
  createAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  addPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }
}
