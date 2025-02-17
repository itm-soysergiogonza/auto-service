import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private _apiUrl: string = '/api/orders'; // Cambiado para usar el proxy

  constructor(private _http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this._apiUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this._http.get<Order>(`${this._apiUrl}/${id}`);
  }

  updateOrder(id: number, changes: Partial<Order>): Observable<Order> {
    return this._http.put<Order>(`${this._apiUrl}/${id}`, changes);
  }

  deleteOrder(id: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${id}`);
  }

  mapToTableData(order: Order): Order {
    return {
      ...order,
      estado: this.translateStatus(order.estado)
    };
  }

  private translateStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDIENTE': 'Pendiente',
      'EN_PROCESO': 'En proceso',
      'FINALIZADO': 'Finalizado'
    };
    return statusMap[status] || status;
  }

  createOrder(order: Order): Observable<Order> {
    return this._http.post<Order>(this._apiUrl, order);
  }
}

