import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UploadComponent {
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  selectedColor: string = 'white';        // Default T-shirt color
  selectedSize: string = 'small';         // Default T-shirt size
  selectedPrintPosition: string = 'front'; // Default print position
  product_id: number = 1;                 // Static product_id for now

  orderData = {
    customer_name: '',
    phone: '',
    coupon_code: ''
  };

  constructor(private http: HttpClient) {}

  // Handle file input
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  loading = false;

  // Optional: on color change (can be used for live preview, logging, etc.)
  onColorChange(): void {
    console.log('Selected color:', this.selectedColor);
  }

  // Handle order submission
  placeOrder(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill in all required fields.');
      return;
    }
  
    if (!this.selectedFile) {
      alert('Please upload an image.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to place an order.');
      return;
    }
  
    this.loading = true; // Start loading
  
    const formData = new FormData();
    formData.append('customer_name', this.orderData.customer_name);
    formData.append('phone', this.orderData.phone);
    formData.append('product_id', this.product_id.toString());
    formData.append('coupon_code', this.orderData.coupon_code || '');
    formData.append('color', this.selectedColor);
    formData.append('size', this.selectedSize);
    formData.append('print_position', this.selectedPrintPosition);
    formData.append('image', this.selectedFile);
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.post('https://shopdb-production-cd92.up.railway.app/api/orders', formData, { headers })
      .subscribe({
        next: (response) => {
          console.log('Order placed successfully:', response);
          alert('Order placed! We\'ll contact you soon.');
          form.resetForm();
          this.imageUrl = null;
          this.selectedFile = null;
          this.loading = false; // Stop loading
        },
        error: (error) => {
          console.error('Error placing order:', error);
          alert('There was an error placing your order. Please check your details and try again.');
          this.loading = false; // Stop loading
        }
      });
  }
  
}
