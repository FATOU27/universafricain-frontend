import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = '';

  categories = [
    { name: 'Tissus', slug: 'tissus', icon: '🧵' },
    { name: 'Nappes', slug: 'nappes', icon: '🍽️' },
    { name: 'Sacs', slug: 'sacs', icon: '👜' },
    { name: 'Paniers', slug: 'paniers', icon: '🧺' }
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
     private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    // Filtre depuis la page d'accueil via queryParams
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.applyFilter();
      }
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilter();
      },
      error: (err) => console.error(err)
    });
  }

  filterByCategory(slug: string): void {
    this.selectedCategory = slug;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        p => p.categorySlug === this.selectedCategory
      );
    }
  }

 addToCart(product: Product): void {
  this.cartService.addToCart(product);
  alert(`"${product.name}" ajouté au panier ! 🛒`);
}
}