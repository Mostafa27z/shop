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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  get filteredProducts() {
    return this.products.filter(product => {
      const name = product.name || ''; // fallback to empty string
      const category = product.category || '';
      const matchesSearch = name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory
        ? category === this.selectedCategory || this.selectedCategory === 'All'
        : true;
      return matchesSearch && matchesCategory;
    });
  }
  

  fetchProducts() {
    this.http.get<any[]>('https://shopdb-production-fcb0.up.railway.app/api/products').subscribe({
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
    this.http.delete(`https://shopdb-production-fcb0.up.railway.app/api/products/${productId}`).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== productId);
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
      }
    });
  }

  saveProduct() {
    if (this.isEditMode) {
      this.http.put(`https://shopdb-production-fcb0.up.railway.app/api/products/${this.currentProduct.id}`, this.currentProduct).subscribe({
        next: (updated) => {
          const index = this.products.findIndex(p => p.id === this.currentProduct.id);
          this.products[index] = updated;
          this.closeModal();
          this.fetchProducts();
          
        },
        error: (err) => {
          console.error('Failed to update product:', err);
        }
      });
    } else {
      this.http.post('https://shopdb-production-fcb0.up.railway.app/api/products', this.currentProduct).subscribe({
        next: (created) => {
          this.products.push(created);
          this.closeModal();
        },
        error: (err) => {
          console.error('Failed to create product:', err);
        }
      });
    }
  }

  openModal(isEdit: boolean, product?: any) {
    this.isEditMode = isEdit;
    if (isEdit && product) {
      this.currentProduct = { ...product };
    } else {
      this.currentProduct = {
        id: '',
        name: '',
        // category: '',
        price: 0,
        stock: 0,
        description: ''
      };
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
