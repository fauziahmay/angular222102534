import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { ContactComponent } from './contact/contact.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full"}, 
    {path: "admin", component: AdminComponent },
    {path: "dashboard", component: DashboardComponent },
    {path: "dashboard2", component: Dashboard2Component},
    {path: "dashboard3", component: Dashboard3Component},
    {path: "register", component: RegisterComponent},
    {path: "login", component: LoginComponent},
    {path: "contact", component: ContactComponent},
    {path: "ecommerce", component: EcommerceComponent}
];

NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule]
})
export class AppRoutes{}        