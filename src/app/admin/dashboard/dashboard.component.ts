import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats = [
    { title: 'Total Orders', value: 0, icon: '🛒' },
    { title: 'Products', value: 0, icon: '👕' },
    { title: 'Customers', value: 0, icon: '👥' },
  ];
  orders: any[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStats();
    this.fetchOrders();
  }

  get filteredOrders() {
    return this.orders.filter(order =>
      Object.values(order).some(value =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  fetchStats() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>('https://shopdb-production-cd92.up.railway.app/api/admin/stats', { headers }).subscribe({
      next: (res) => {
        this.stats[0].value = res.totalOrders;
        this.stats[1].value = res.totalProducts;
        this.stats[2].value = res.totalCustomers;
      },
      error: err => {
        console.error('Failed to fetch stats:', err);
      }
    });
  }

  fetchOrders() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>('https://shopdb-production-cd92.up.railway.app/api/admin/recent-orders', { headers }).subscribe({
      next: data => this.orders = data,
      error: err => console.error('Failed to fetch recent orders:', err)
    });
  }
}
