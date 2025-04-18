import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { UploadComponent } from './upload/upload.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductsComponent } from './admin/products/products.component';
import { LayoutComponent } from './layout/layout.component';
import { PproductsComponent } from './pproducts/pproducts.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { GuestGuard } from './auth/guest.guard';
import { LoginComponent } from './pages/login/login.component';
import { MyOrdersComponent } from './my-orders.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { UsersComponent } from './admin/users/users.component';

export const routes: Routes = [
    
   {path: 'admin',
    component: AdminComponent,
    canActivate:[AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'users', component: UsersComponent },
    ],
  } ,
  {path: '',
    component: LayoutComponent,
    children: [
        {path:'' , component:HomeComponent},
        {path:'how-it-works' , component:HowItWorksComponent , canActivate: [AuthGuard]},
        {path:'upload' , component:UploadComponent , canActivate: [AuthGuard]},
        {path:'contact' , component:ContactComponent , canActivate: [GuestGuard]},
        {path:'products' , component:PproductsComponent},
        {path:'myorders' , component:MyOrdersComponent , canActivate: [AuthGuard]},
        {path:'register' , component:RegisterComponent , canActivate: [GuestGuard]},
        {path:'login' , component:LoginComponent , canActivate: [GuestGuard]},
    ],
  } 
];
