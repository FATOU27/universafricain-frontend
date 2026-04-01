import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../../core/models/order.model';
import { Product } from '../../../core/models/product.model';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];
  orders: OrderResponse[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err)
    });
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error(err)
    });
  }

  get pendingOrders(): number {
    return this.orders.filter(o => o.status === 'PENDING').length;
  }

  get totalRevenue(): number {
    return this.orders
      .filter(o => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }

  updateStatus(id: number, status: string): void {
    this.orderService.updateOrderStatus(id, status).subscribe({
      next: () => this.loadOrders(),
      error: (err) => console.error(err)
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error(err)
      });
    }
  }
}