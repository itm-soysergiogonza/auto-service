import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface OrderResponse {
  id: number;
  tipo: string;
  descripcion: string;
  fechaOrden: string;
  estado: string;
  placaVehiculo: string;
}

export interface OrderTableData {
  id: number;
  plate: string;
  serviceType: string;
  status: string;
  date: string;
}

export interface OrderCreate {
  tipo: string;
  descripcion: string;
  fechaOrden: string;
  estado: string;
  placaVehiculo: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiUrl);
  }

  mapToTableData(order: OrderResponse): OrderTableData {
    return {
      id: order.id,
      plate: order.placaVehiculo,
      serviceType: order.tipo,
      status: this.translateStatus(order.estado),
      date: order.fechaOrden
    };
  }

  private translateStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDIENTE': 'Pendiente',
      'EN_PROCESO': 'En proceso',
      'COMPLETADO': 'Completado'
    };
    return statusMap[status] || status;
  }

  createOrder(order: OrderCreate): Observable<OrderResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post<OrderResponse>(this.apiUrl, order, { headers });
  }

  getOrderById(id: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`);
  }

  updateOrder(id: number, changes: Partial<OrderCreate>): Observable<OrderResponse> {
    const url = `${this.apiUrl}/${id}`;
    console.log('URL de actualización:', url);
    console.log('Datos a enviar:', changes);
    
    return this.http.put<OrderResponse>(url, changes);
  }
} 