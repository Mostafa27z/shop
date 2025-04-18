import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-nav',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.scss'
})
export class AdminNavComponent {
  isMenuOpen = false;
  auth = inject(AuthService);
  router = inject(Router);
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
}
