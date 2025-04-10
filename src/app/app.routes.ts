import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { UploadComponent } from './upload/upload.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path:'' , component:HomeComponent},
    {path:'how-it-works' , component:HowItWorksComponent},
    {path:'upload' , component:UploadComponent},
    {path:'contact' , component:ContactComponent}
];
