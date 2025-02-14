import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, OrderResponse, OrderCreate } from '../../services/order.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModalEditComponent {
  @Output() orderUpdated = new EventEmitter<void>();
  
  orderToEdit: OrderCreate = {
    tipo: '',
    descripcion: '',
    fechaOrden: '',
    estado: '',
    placaVehiculo: ''
  };
  
  private modalInstance: any;
  private currentOrderId: number = 0;
  private originalOrder: OrderCreate | null = null;

  constructor(private orderService: OrderService) {}

  openModal(orderId: number) {
    console.log('ID de orden a editar:', orderId);
    this.currentOrderId = orderId;
    
    this.orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        console.log('Datos originales:', response);
        this.originalOrder = {
          tipo: response.tipo || '',
          descripcion: response.descripcion || '',
          fechaOrden: response.fechaOrden || '',
          estado: response.estado || '',
          placaVehiculo: response.placaVehiculo || ''
        };
        
        this.orderToEdit = { ...this.originalOrder };
        
        const modalElement = document.getElementById('modalEdit');
        if (modalElement) {
          this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
          this.modalInstance.show();
        }
      },
      error: (error) => {
        console.error('Error al cargar la orden:', error);
      }
    });
  }

  saveChanges() {
    console.log('Guardando cambios para orden ID:', this.currentOrderId);
    
    if (this.originalOrder) {
      const changes: Partial<OrderCreate> = {};

      if (this.orderToEdit.descripcion !== this.originalOrder.descripcion) {
        changes.descripcion = this.orderToEdit.descripcion.trim() || null;
      }
      if (this.orderToEdit.estado !== this.originalOrder.estado) {
        changes.estado = this.orderToEdit.estado || null;
      }
      if (this.orderToEdit.placaVehiculo !== this.originalOrder.placaVehiculo) {
        changes.placaVehiculo = this.orderToEdit.placaVehiculo.trim() || null;
      }

      console.log('Campos modificados a enviar:', changes);

      if (Object.keys(changes).length > 0) {
        this.orderService.updateOrder(this.currentOrderId, changes).subscribe({
          next: (response) => {
            console.log('Orden actualizada exitosamente:', response);
            this.orderUpdated.emit();
            this.modalInstance.hide();
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al actualizar la orden:', error);
          }
        });
      } else {
        console.log('No hay cambios para guardar');
        this.modalInstance.hide();
      }
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
} 