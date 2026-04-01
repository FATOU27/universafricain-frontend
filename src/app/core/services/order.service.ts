import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderRequest, OrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  createOrder(order: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/orders`, order);
  }

  // Admin
  getAllOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`${this.apiUrl}/admin/orders`);
  }

  updateOrderStatus(id: number, status: string): Observable<OrderResponse> {
    return this.http.put<OrderResponse>(
      `${this.apiUrl}/admin/orders/${id}/status?status=${status}`, {}
    );
  }
}