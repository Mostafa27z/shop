import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],  // Fixed 'styleUrl' to 'styleUrls'
})
export class OrdersComponent {
  searchTerm: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

  orders = [
    {
      id: '#ORD001',
      customer: 'Ali Mostafa',
      phone: '01012345678',
      product: 'Black T-Shirt',
      date: 'Apr 11, 2025',
      status: 'Pending',
    },
    {
      id: '#ORD002',
      customer: 'Sara Khaled',
      phone: '01087654321',
      product: 'White Hoodie',
      date: 'Apr 10, 2025',
      status: 'Delivered',
    },
    {
      id: '#ORD003',
      customer: 'Hana Mohamed',
      phone: '01122334455',
      product: 'Custom Tank Top',
      date: 'Apr 09, 2025',
      status: 'Shipped',
    },
  ];

  get filteredOrders() {
    return this.orders.filter(order => {
      const matchesSearch = Object.values(order).some(val =>
        val.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      const matchesStatus = this.selectedStatus
        ? order.status === this.selectedStatus
        : true;
      return matchesSearch && matchesStatus;
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredOrders);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'orders.xlsx');
  }
}
