import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CategoryService } from '../services/category.service';
@Component({
  selector: 'app-home',
  imports: [RouterLink , CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data:any[]) => {
        this.products = data;
        this.applyFilters();
        console.log(this.products)
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = ['All', ...data.map((category) => category.name)];
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }
  

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory && this.selectedCategory !== 'All'
          ? product.category === this.selectedCategory
          : true;

      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.applyFilters();
  }

  onCategoryChange(value: string): void {
    this.selectedCategory = value;
    this.applyFilters();
  }

  addToCart(productId: number): void {
    console.log(`Added product with ID ${productId} to cart.`);
    // Add to cart service or storage logic here
  }
}
