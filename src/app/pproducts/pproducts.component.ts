import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pproducts',
  imports: [CommonModule, FormsModule],
  templateUrl: './pproducts.component.html',
  styleUrl: './pproducts.component.scss'
})
export class PproductsComponent {
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = ['All', 'T-Shirts', 'Hoodies', 'Accessories'];

  products = [
    {
      id: 'prod001',
      name: 'Black T-Shirt',
      category: 'T-Shirts',
      price: 20,
      description: 'A classic black T-shirt for all occasions.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 'prod002',
      name: 'White Hoodie',
      category: 'Hoodies',
      price: 40,
      description: 'Stay warm in this stylish white hoodie.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 'prod003',
      name: 'Custom Mug',
      category: 'Accessories',
      price: 15,
      description: 'A custom mug with your design.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 'prod004',
      name: 'Red T-Shirt',
      category: 'T-Shirts',
      price: 18,
      description: 'A vibrant red T-shirt for any occasion.',
      imageUrl: 'https://via.placeholder.com/150',
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

  addToCart(productId: string) {
    console.log(`Added product with id ${productId} to cart.`);
    // Add logic for adding products to the cart here.
  }
}
