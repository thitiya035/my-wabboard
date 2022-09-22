import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Comment {
  id: number;
  userId: string;
  postId: number;
  comment: string;
  createAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getComment(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment);
  }
}
