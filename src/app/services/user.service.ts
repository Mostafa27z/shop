// user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'https://shopdb-production-fcb0.up.railway.app/api/user';

  constructor(private http: HttpClient) {}

  profile() {
    return this.http.get(this.api);
  }
}
