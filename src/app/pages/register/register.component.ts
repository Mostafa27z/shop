import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // 👈 import it here
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.registerForm.invalid) return;
  
    const formData = this.registerForm.value;
    console.log('Registering user:', formData);
  
    this.auth.register(formData).subscribe({
      next: (res: any) => {
        this.auth.setToken(res.token);
        this.auth.setUser(res.user); // 👈 store user data
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Registration error:', err);
        // Optional: show error message to user
      }
    });
  }
  
}
