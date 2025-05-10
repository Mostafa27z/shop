import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://127.0.0.1:8000/api/coupons'; // Adjust the API URL

  constructor(private http: HttpClient) {}

  getCoupons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCoupon(coupon: any): Observable<any> {
    return this.http.post(this.apiUrl, coupon);
  }

  updateCoupon(coupon: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${coupon.id}`, coupon);
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
