import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://shopdb-production-fcb0.up.railway.app/api';

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout() {
    localStorage.clear(); 
    window.location.reload(); 
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
setUser(user: any) {
  localStorage.setItem('user', JSON.stringify(user));
}

getUser(): any {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
