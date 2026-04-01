export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  contactMethod: 'ONLINE_PAYMENT' | 'WHATSAPP';
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  createdAt: string;
  status: string;
  contactMethod: string;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItemResponse[];
}

export interface OrderItemResponse {
  productName: string;
  imageUrl: string;
  quantity: number;
  unitPrice: number;
}