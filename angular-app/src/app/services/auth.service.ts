import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';
export interface UserPostResponse {
  success: boolean;
  msg: string;
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
  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers}).pipe(map(res => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
