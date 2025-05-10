import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-coupons',
  templateUrl: './admin-coupons.component.html',
  styleUrls: ['./admin-coupons.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AdminCouponsComponent implements OnInit {
  coupons: any[] = [];
  isModalOpen: boolean = false;
  isEditMode: boolean = false;
  couponForm: any = {
    code: '',
    type: 'fixed', // Default value for the type
    value: 0,
    min_order_amount: 0,
    usage_limit: 0,
    used_count: 0,
    expires_at: '',
  };

  constructor(private couponService: CouponService, private router: Router) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.couponService.getCoupons().subscribe({
      next: (data: any[]) => {
        this.coupons = data;
      },
      error: (error) => {
        console.error('Error loading coupons:', error);
      }
    });
  }

  openAddCouponModal(): void {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.couponForm = { 
      code: '', 
      type: 'fixed', // Reset type to default value
      value: 0, 
      min_order_amount: 0, 
      usage_limit: 0, 
      used_count: 0, 
      expires_at: '' 
    }; // Reset the form
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveCoupon(): void {
    if (this.isEditMode) {
      this.couponService.updateCoupon(this.couponForm).subscribe(() => {
        this.loadCoupons();
        this.closeModal();
      });
    } else {
      this.couponService.addCoupon(this.couponForm).subscribe(() => {
        this.loadCoupons();
        this.closeModal();
      });
    }
  }

  editCoupon(id: number): void {
    const coupon = this.coupons.find(c => c.id === id);
    if (coupon) {
      this.isModalOpen = true;
      this.isEditMode = true;
      this.couponForm = { ...coupon };
    }
  }

  deleteCoupon(id: number): void {
    if (confirm('Are you sure you want to delete this coupon?')) {
      this.couponService.deleteCoupon(id).subscribe(() => {
        this.loadCoupons();
      });
    }
  }
}
