import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
export interface UserPostResponse {
  success: boolean;
}
@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }
  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<UserPostResponse>('http://localhost:3000/users/register', user, {headers})
      .pipe(map(res => res));
  }
}
