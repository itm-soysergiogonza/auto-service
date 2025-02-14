import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

interface Order {
  id: number;
  plate: string;
  brand: string;
  model: string;
  serviceType: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-ordenes',
  templateUrl: './orders.component.html',
})

export class HomeComponent {
  orders: Order[] = [
    {
      id: 1,
      plate: 'ABC123',
      brand: 'Toyota',
      model: 'Corolla',
      serviceType: 'Mantenimiento',
      status: 'En proceso',
      date: '2024-03-15',
    },
    {
      id: 2,
      plate: 'XYZ789',
      brand: 'Honda',
      model: 'Civic',
      serviceType: 'Reparación',
      status: 'Completado',
      date: '2024-03-14',
    },
  ];
}
