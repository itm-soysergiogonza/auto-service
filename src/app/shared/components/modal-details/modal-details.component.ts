import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../features/order/interfaces/order.interfaces';
import { OrderService } from '../../../features/order/services/order.service';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ModalDetailsComponent {
  orderDetails: Order | null = null;
  private _modalInstance: any;

  constructor(private _orderService: OrderService) {}

  openModal(orderId: number) {
    this._orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.orderDetails = response;
        const modalElement = document.getElementById('modalDetails');
        if (modalElement) {
          this._modalInstance = new (window as any).bootstrap.Modal(modalElement);
          this._modalInstance.show();
        }
      },
      error: (error: Error) => {
        console.error('Error al cargar los detalles de la orden:', error);
      }
    });
  }

  closeModal() {
    if (this._modalInstance) {
      this._modalInstance.hide();
      this.orderDetails = null;
    }
  }
}
