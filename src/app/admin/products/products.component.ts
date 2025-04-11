import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = ['All', 'T-Shirts', 'Hoodies', 'Accessories'];

  // Modal form data
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

  products = [
    {
      id: 'prod001',
      name: 'Black T-Shirt',
      category: 'T-Shirts',
      price: 20,
      stock: 50,
      description: 'A classic black T-shirt for all occasions.',
    },
    {
      id: 'prod002',
      name: 'White Hoodie',
      category: 'Hoodies',
      price: 40,
      stock: 30,
      description: 'Stay warm in this stylish white hoodie.',
    },
    {
      id: 'prod003',
      name: 'Custom Mug',
      category: 'Accessories',
      price: 15,
      stock: 100,
      description: 'A custom mug with your design.',
    },
    {
      id: 'prod004',
      name: 'Red T-Shirt',
      category: 'T-Shirts',
      price: 18,
      stock: 20,
      description: 'A vibrant red T-shirt for any occasion.',
    },
  ];

  get filteredProducts() {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory
        ? product.category === this.selectedCategory || this.selectedCategory === 'All'
        : true;
      return matchesSearch && matchesCategory;
    });
  }

  openModal(isEdit: boolean, product?: any) {
    this.isEditMode = isEdit;
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
  }

  saveProduct() {
    if (this.isEditMode) {
      const index = this.products.findIndex(p => p.id === this.currentProduct.id);
      this.products[index] = { ...this.currentProduct };
    } else {
      this.currentProduct.id = `prod${this.products.length + 1}`;
      this.products.push({ ...this.currentProduct });
    }
    this.closeModal();
  }

  deleteProduct(productId: string) {
    this.products = this.products.filter(product => product.id !== productId);
  }

  addProduct() {
    this.openModal(false);
  }

  editProduct(product: any) {
    this.openModal(true, product);
  }
}
