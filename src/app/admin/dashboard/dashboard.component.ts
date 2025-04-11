import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats = [
    { title: 'Total Orders', value: 126, icon: '🛒' },
    { title: 'Products', value: 42, icon: '👕' },
    { title: 'Customers', value: 78, icon: '👥' },
    { title: 'Revenue', value: '$3,240', icon: '💰' },
  ];
  orders = [
    {
      id: '#ORD001',
      customer: 'Ali Mostafa',
      product: 'Black T-Shirt',
      date: 'Apr 11, 2025',
      status: 'Pending',
    },
    {
      id: '#ORD002',
      customer: 'Sara Khaled',
      product: 'White T-Shirt',
      date: 'Apr 10, 2025',
      status: 'Shipped',
    },
    {
      id: '#ORD003',
      customer: 'Mohamed Adel',
      product: 'Blue Hoodie',
      date: 'Apr 09, 2025',
      status: 'Delivered',
    },
    {
      id: '#ORD004',
      customer: 'Yasmin Nabil',
      product: 'Custom Tank Top',
      date: 'Apr 08, 2025',
      status: 'Cancelled',
    },
  ];
  searchTerm: string = '';

get filteredOrders() {
  return this.orders.filter(order =>
    Object.values(order).some(value =>
      value.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  );
}

}
