import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:5000/login', payload);
  }

  public logout(): void {
    localStorage.removeItem('USER_TOKEN');
    localStorage.removeItem('USER');
    this.router.navigate(['/login']);
  }

}
