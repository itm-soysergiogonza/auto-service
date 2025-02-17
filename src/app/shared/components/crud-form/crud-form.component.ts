import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { OrderService } from '../../../features/order/services/order.service';
import { Order } from '../../../features/order/interfaces/order.interfaces';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ModalCreateComponent,
    ModalDetailsComponent,
    SearchBarComponent,
    ModalEditComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './crud-form.component.html',
})
export class CrudFormComponent implements OnInit {
  @ViewChild('modalCreate') modalCreate!: ModalCreateComponent;
  @ViewChild('modalDetails') modalDetails!: ModalDetailsComponent;
  @ViewChild('modalEdit') modalEdit!: ModalEditComponent;
  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;

  orders: Order[] = [];
  private orderToDelete: number | null = null;

  constructor(private _orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this._orderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response;
      },
      error: (error) => {
        console.error('Error al cargar las órdenes:', error);
      }
    });
  }

  openCreateModal() {
    this.modalCreate.openModal();
  }

  handleOrderCreated(order: Order) {
    this.loadOrders();
  }

  viewDetails(orderId: number) {
    this.modalDetails.openModal(orderId);
  }

  editOrder(orderId: number) {
    this.modalEdit.openModal(orderId);
  }

  handleOrderUpdated() {
    this.loadOrders();
  }

  deleteOrder(orderId: number) {
    this.orderToDelete = orderId;
    setTimeout(() => {
      this.confirmDialog.show();
    });
  }

  confirmDelete() {
    if (this.orderToDelete) {
      this._orderService.deleteOrder(this.orderToDelete).subscribe({
        next: () => {
          this.loadOrders();
          this.orderToDelete = null;
        },
        error: (error) => {
          console.error('Error al eliminar la orden:', error);
          this.orderToDelete = null;
        }
      });
    }
  }
}
