export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  origine: string;
  isAvailable: boolean;
  categoryName?: string;
  categorySlug?: string;
}