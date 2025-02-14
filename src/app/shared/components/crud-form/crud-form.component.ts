import {Component, ViewChild} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {ModalCreateComponent} from '../modal-create/modal-create.component';


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
  selector: 'app-crud-form',
  imports: [
    NgClass,
    NgForOf,
    ModalCreateComponent
  ],
  templateUrl: './crud-form.component.html',
})
export class CrudFormComponent {


  @ViewChild('modalCreate') modalCreate!: ModalCreateComponent;

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

  openCreateModal() {
    this.modalCreate.openModal();
  }

  handleOrderCreated(order: any) {
    this.orders.push(order);
    console.log('Nueva orden creada:', order);
  }
}
