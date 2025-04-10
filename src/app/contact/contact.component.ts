import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  submitForm(): void {
    alert("Thanks for reaching out! We'll get back to you soon.");
  }
}
