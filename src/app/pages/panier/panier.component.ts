import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html'
})
export class PanierComponent implements OnInit {

  cartItems: CartItem[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  orderForm = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    contactMethod: 'WHATSAPP' as 'WHATSAPP' | 'ONLINE_PAYMENT'
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  updateQty(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onOrder(): void {
    this.loading = true;
    this.errorMessage = '';

    const orderRequest = {
      customerName: this.orderForm.customerName,
      customerEmail: this.orderForm.customerEmail,
      customerPhone: this.orderForm.customerPhone,
      contactMethod: this.orderForm.contactMethod,
      items: this.cartItems.map(i => ({
        productId: i.product.id!,
        quantity: i.quantity
      }))
    };

    this.orderService.createOrder(orderRequest).subscribe({
      next: () => {
        this.successMessage = '🎉 Commande confirmée ! Nous vous contacterons bientôt.';
        this.cartService.clear();
        this.loading = false;
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la commande. Réessayez.';
        this.loading = false;
      }
    });
  }
}