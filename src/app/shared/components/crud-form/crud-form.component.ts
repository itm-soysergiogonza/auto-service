import { Component, OnInit, ViewChild } from '@angular/core';
import { NgClass, NgForOf, DatePipe } from '@angular/common';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';
import { OrderService, OrderTableData } from '../../services/order.service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    DatePipe,
    ModalCreateComponent,
    ModalDetailsComponent,
    SearchBarComponent,
    ModalEditComponent
  ],
  templateUrl: './crud-form.component.html',
})
export class CrudFormComponent implements OnInit {
  @ViewChild('modalCreate') modalCreate!: ModalCreateComponent;
  @ViewChild('modalDetails') modalDetails!: ModalDetailsComponent;
  @ViewChild('modalEdit') modalEdit!: ModalEditComponent;

  orders: OrderTableData[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (response) => {
        console.log('Órdenes actualizadas:', response);
        this.orders = response.map(order => this.orderService.mapToTableData(order));
      },
      error: (error) => {
        console.error('Error al cargar las órdenes:', error);
      }
    });
  }

  openCreateModal() {
    this.modalCreate.openModal();
  }

  handleOrderCreated(order: any) {
    this.loadOrders();
  }

  viewDetails(orderId: number) {
    this.modalDetails.openModal(orderId);
  }

  editOrder(orderId: number) {
    this.modalEdit.openModal(orderId);
  }

  handleOrderUpdated() {
    console.log('Actualizando lista de órdenes...');
    this.loadOrders();
  }
}
