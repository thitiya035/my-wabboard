import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/users';

  currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }
}
