import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  imageUrl: string | ArrayBuffer | null = null;

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.imageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  placeOrder(): void {
    // Placeholder action
    alert("Order placed! We'll contact you soon.");
  }
}
