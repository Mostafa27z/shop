import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  searchTerm: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>('http://127.0.0.1:8000/api/orders', { headers }).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      },
    });
  }

  get filteredOrders() {
    return this.orders.filter(order => {
      const matchesSearch = Object.values(order).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      const matchesStatus = this.selectedStatus ? order.status === this.selectedStatus : true;
      return matchesSearch && matchesStatus;
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredOrders);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'orders.xlsx');
  }

  updateOrderStatus(order: any): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = { status: order.status };

    this.http.post(`http://127.0.0.1:8000/api/orders/${order.id}/status`, body, { headers }).subscribe({
      next: () => {
        console.log(`Order #${order.id} status updated to ${order.status}`);
      },
      error: (err) => {
        console.error(`Failed to update order #${order.id} status:`, err);
      },
    });
  }
}
