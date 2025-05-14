import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'https://shopdb-production-cd92.up.railway.app/api/coupons';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCoupons(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }

  addCoupon(coupon: any): Observable<any> {
    return this.http.post(this.apiUrl, coupon, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }

  updateCoupon(coupon: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${coupon.id}`, coupon, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }
}
