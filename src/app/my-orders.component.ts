import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to view orders.');
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.http.get<any[]>('https://shopdb-production-fcb0.up.railway.app/api/my-orders', { headers }).subscribe({
      next: (data) => {this.orders = data
        console.log(data)
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        alert('Could not load orders. Please make sure you are logged in.');
      }
      
    });
   
  }

  canDelete(orderDate: string): boolean {
    const orderTime = new Date(orderDate).getTime();
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    return now - orderTime <= oneDay;
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.http.delete(`https://shopdb-production-fcb0.up.railway.app/api/orders/${id}`).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== id);
          alert('Order deleted successfully.');
        },
        error: (err) => {
          console.error('Failed to delete order', err);
          alert('Could not delete order.');
        }
      });
    }
  }
}
