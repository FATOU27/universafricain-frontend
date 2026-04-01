import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { ProductFormComponent } from './pages/admin/product-form/product-form.component';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { HomeComponent } from './pages/home/home.component';
import { PanierComponent } from './pages/panier/panier.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]  // ← protégé
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard]  // ← protégé
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard]  // ← protégé
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }