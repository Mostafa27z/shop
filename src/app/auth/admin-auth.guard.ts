import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user'); // Assuming you store user info

    if (token && userData) {
      const user = JSON.parse(userData);
      if (user.role === 'admin') {
        return true;
      }
    }

    // Redirect if not admin
    this.router.navigate(['/login']);
    return false;
  }
}
