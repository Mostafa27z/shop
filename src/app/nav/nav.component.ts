import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isMenuOpen = false;
  auth = inject(AuthService);
  router = inject(Router);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get userName(): string | null {
    // Assume user name is stored in localStorage under 'user' after login/register
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : null;
  }
}
