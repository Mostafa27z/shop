import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  submitForm(): void {
    this.http.post('http://127.0.0.1:8000/api/messages', this.formData).subscribe({
      next: () => {
        alert("Thanks for reaching out! We'll get back to you soon.");
        this.formData = { name: '', email: '', message: '' };
      },
      error: (err) => {
        console.error('Error submitting message:', err);
        alert("Oops! Something went wrong.");
      }
    });
  }
}
