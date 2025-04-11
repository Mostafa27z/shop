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

export const routes: Routes = [
    
   {path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
    ],
  } ,
  {path: '',
    component: LayoutComponent,
    children: [
        {path:'' , component:HomeComponent},
        {path:'how-it-works' , component:HowItWorksComponent},
        {path:'upload' , component:UploadComponent},
        {path:'contact' , component:ContactComponent},
        {path:'products' , component:PproductsComponent},
    ],
  } 
];
