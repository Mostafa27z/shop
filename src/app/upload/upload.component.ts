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
  // Preview image source
  imageUrl: string | ArrayBuffer | null = null;

  // File selected by the user
  selectedFile: File | null = null;

  // Form options
  selectedColor: string = 'white';         // Default T-shirt color
  selectedSize: string = 'small';          // Default T-shirt size
  selectedPrintPosition: string = 'front'; // Default print position
  product_id: number = 1;                  // Static product ID for now

  // Form data
  orderData = {
    customer_name: '',
    phone: '',
    coupon_code: '',
    notes: '' // ✅ Added notes field
  };

  loading = false;

  constructor(private http: HttpClient) {}

  // Handle file input change
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

  // Called on color dropdown change
  onColorChange(): void {
    console.log('Selected color:', this.selectedColor);
  }

  // Submit the form
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

    this.loading = true;

    const formData = new FormData();
    formData.append('customer_name', this.orderData.customer_name);
    formData.append('phone', this.orderData.phone);
    formData.append('product_id', this.product_id.toString());
    formData.append('coupon_code', this.orderData.coupon_code || '');
    formData.append('notes', this.orderData.notes || ''); // ✅ Send notes to backend
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
          this.resetState();
        },
        error: (error) => {
          console.error('Error placing order:', error);
          alert('There was an error placing your order. Please check your details and try again.');
          this.loading = false;
        }
      });
  }

  // Reset form and image preview
  resetState(): void {
    this.imageUrl = null;
    this.selectedFile = null;
    this.loading = false;

    // Reset dropdowns to default if needed
    this.selectedColor = 'white';
    this.selectedSize = 'small';
    this.selectedPrintPosition = 'front';

    // Clear form fields
    this.orderData = {
      customer_name: '',
      phone: '',
      coupon_code: '',
      notes: ''
    };
  }
}
