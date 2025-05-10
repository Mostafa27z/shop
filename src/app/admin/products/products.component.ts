import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = ['T-Shirts', 'Hoodies', 'Accessories'];

  products: any[] = [];
  modalOpen: boolean = false;
  isEditMode: boolean = false;
  currentProduct: any = {
    id: '',
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: ''
  };
  selectedImages: File[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  get filteredProducts() {
    return this.products.filter(product => {
      const name = product.name || '';
      const category = product.category || '';
      const matchesSearch = name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory
        ? category === this.selectedCategory || this.selectedCategory === 'All'
        : true;
      return matchesSearch && matchesCategory;
    });
  }

  fetchProducts() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/products').subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      }
    });
  }

  addProduct() {
    this.openModal(false);
  }

  editProduct(product: any) {
    this.openModal(true, product);
  }

  deleteProduct(productId: string) {
    this.http.delete(`http://127.0.0.1:8000/api/products/${productId}`).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== productId);
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
      }
    });
  }

  onImagesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedImages = Array.from(files).slice(0, 3); // تأكد من أن المستخدم لا يرفع أكثر من 3 صور
  }

  saveProduct() {
    const formData = new FormData();
    formData.append('name', this.currentProduct.name);
    formData.append('price', this.currentProduct.price.toString());
    formData.append('description', this.currentProduct.description);

    this.selectedImages.forEach(file => {
      formData.append('images[]', file);
    });

    const url = this.isEditMode
      ? `http://127.0.0.1:8000/api/products/${this.currentProduct.id}?_method=PUT`
      : 'http://127.0.0.1:8000/api/products';

    this.http.post(url, formData).subscribe({
      next: () => {
        this.closeModal();
        this.fetchProducts();
      },
      error: (err) => {
        console.error('Failed to save product:', err);
      }
    });
  }

  openModal(isEdit: boolean, product?: any) {
    this.isEditMode = isEdit;
    this.selectedImages = [];

    if (isEdit && product) {
      this.currentProduct = { ...product };
    } else {
      this.currentProduct = {
        id: '',
        name: '',
        category: '',
        price: 0,
        stock: 0,
        description: ''
      };
    }

    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedImages = [];
  }
}
