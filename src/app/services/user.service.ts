// user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://127.0.0.1:8000/api/user';

  constructor(private http: HttpClient) {}

  profile() {
    return this.http.get(this.api);
  }
}
