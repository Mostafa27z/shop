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
  selectedImage: File | null = null;

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

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  saveProduct() {
    const formData = new FormData();
    formData.append('name', this.currentProduct.name);
    formData.append('price', this.currentProduct.price.toString());
    formData.append('description', this.currentProduct.description);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.isEditMode) {
      this.http.post(`http://127.0.0.1:8000/api/products/${this.currentProduct.id}?_method=PUT`, formData).subscribe({
        next: () => {
          this.closeModal();
          this.fetchProducts();
        },
        error: (err) => {
          console.error('Failed to update product:', err);
        }
      });
    } else {
      this.http.post('http://127.0.0.1:8000/api/products', formData).subscribe({
        next: () => {
          this.closeModal();
          this.fetchProducts();
        },
        error: (err) => {
          console.error('Failed to create product:', err);
        }
      });
    }
  }

  openModal(isEdit: boolean, product?: any) {
    this.isEditMode = isEdit;
    this.selectedImage = null;

    if (isEdit && product) {
      this.currentProduct = { ...product };
    } else {
      this.currentProduct = {
        id: '',
        name: '',
        price: 0,
        stock: 0,
        description: ''
      };
    }

    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedImage = null;
  }
}
