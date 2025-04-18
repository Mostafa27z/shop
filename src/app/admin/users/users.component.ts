import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  searchTerm: string = '';
  selectedRole: string = '';
  roles: string[] = ['admin', 'user'];
  currentUserId: number = 0;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUser().id;
    this.fetchUsers();
  }

  fetchUsers(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>('https://shopdb-production-cd92.up.railway.app/api/users', { headers }).subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Failed to fetch users:', err)
    });
  }

  get filteredUsers() {
    return this.users
      .filter(user => user.id !== this.currentUserId) // 👈 exclude current user
      .filter(user => {
        const matchesSearch = Object.values(user).some(val =>
          typeof val === 'string' && val.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        const matchesRole = this.selectedRole ? user.role === this.selectedRole : true;
        return matchesSearch && matchesRole;
      });
  }

  updateUser(user: any): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`https://shopdb-production-cd92.up.railway.app/api/users/${user.id}`, {
      role: user.role
    }, { headers }).subscribe({
      next: (res) => console.log('User updated:', res),
      error: (err) => console.error('Failed to update user:', err)
    });
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredUsers);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'users.xlsx');
  }
}
