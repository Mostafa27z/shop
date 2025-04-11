import { Component } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { FooterComponent } from '../../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';

@Component({
  selector: 'app-admin',
  imports: [AdminNavComponent , FooterComponent, RouterOutlet, AdminFooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
