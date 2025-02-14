import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService, OrderResponse } from '../../services/order.service';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ModalDetailsComponent {
  orderDetails: OrderResponse | null = null;
  private modalInstance: any;

  constructor(private orderService: OrderService) {}

  openModal(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.orderDetails = response;
        const modalElement = document.getElementById('modalDetails');
        if (modalElement) {
          this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
          this.modalInstance.show();
        }
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la orden:', error);
      }
    });
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.orderDetails = null;
    }
  }
} 