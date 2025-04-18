// order.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = 'https://shopdb-production-fcb0.up.railway.app/api/orders';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api);
  }

  get(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  updateStatus(id: number, status: string) {
    return this.http.put(`${this.api}/${id}/status`, { status });
  }
}
