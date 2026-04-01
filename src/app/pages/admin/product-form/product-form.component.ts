import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CloudinaryService } from '../../../core/services/cloudinary.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    origine: '',
    isAvailable: true,
    categorySlug: ''
  };

  isEditMode = false;
  loading = false;
  uploading = false;
  uploadSuccess = false;
  errorMessage = '';
  successMessage = '';
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.productService.getProductById(Number(id)).subscribe({
        next: (data) => this.product = data,
        error: () => this.errorMessage = 'Produit introuvable'
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.uploadSuccess = false;
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.uploadSuccess = false;

    this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
      next: (url) => {
        this.product.imageUrl = url;
        this.uploading = false;
        this.uploadSuccess = true;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'upload de l\'image.';
        this.uploading = false;
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isEditMode && this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          this.successMessage = 'Produit modifié avec succès !';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/admin/dashboard']), 1500);
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la modification.';
          this.loading = false;
        }
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => {
          this.successMessage = 'Produit ajouté avec succès !';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/admin/dashboard']), 1500);
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la création.';
          this.loading = false;
        }
      });
    }
  }
}