import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Order} from '../../../features/order/interfaces/order.interfaces';
import {OrderService} from '../../../features/order/services/order.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModalEditComponent {
  @Output() orderUpdated = new EventEmitter<void>();

  orderToEdit: Order = {
    tipo: '',
    descripcion: null,
    fechaOrden: '',
    estado: '',
    placaVehiculo: null
  };

  formErrors: { [key: string]: string } = {};
  private _modalInstance: any;
  private _currentOrderId: number = 0;
  private _originalOrder!: Order;

  constructor(private _orderService: OrderService) {}

  openModal(orderId: number) {
    this._currentOrderId = orderId;
    this.formErrors = {};

    this._orderService.getOrderById(orderId)
      .subscribe({
        next: (response) => {
          this._originalOrder = {
            tipo: response.tipo,
            descripcion: response.descripcion,
            fechaOrden: response.fechaOrden,
            estado: response.estado,
            placaVehiculo: response.placaVehiculo
        };

        this.orderToEdit = { ...this._originalOrder };

        const modalElement = document.getElementById('modalEdit');
        if (modalElement) {
          this._modalInstance = new (window as any).bootstrap.Modal(modalElement);
          this._modalInstance.show();
        }
      },
      error: (error) => {
        console.error('Error al cargar la orden:', error);
      }
    });
  }

  saveChanges() {
    const changes: Partial<Order> = {
      descripcion: this._originalOrder.descripcion,
      estado: this._originalOrder.estado,
      placaVehiculo: this._originalOrder.placaVehiculo
    };

    if (this.orderToEdit.descripcion?.trim() !== this._originalOrder.descripcion) {
      const trimmedDesc = this.orderToEdit.descripcion?.trim();
      if (trimmedDesc) {
        changes.descripcion = trimmedDesc;
      }
    }

    if (this.orderToEdit.estado !== this._originalOrder.estado) {
      if (this.orderToEdit.estado) {
        changes.estado = this.orderToEdit.estado;
      }
    }

    if (this.orderToEdit.placaVehiculo?.trim() !== this._originalOrder.placaVehiculo) {
      const trimmedPlaca = this.orderToEdit.placaVehiculo?.trim();
      if (trimmedPlaca) {
        changes.placaVehiculo = trimmedPlaca;
      }
    }

    const hasChanges = Object.entries(changes).some(([key, value]) =>
      value !== this._originalOrder[key as keyof Order]
    );

    if (hasChanges) {
      this._orderService.updateOrder(this._currentOrderId, changes).subscribe({
        next: (response) => {
          this.orderUpdated.emit();
          this._modalInstance.hide();
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al actualizar la orden:', error);
        }
      });
    } else {
      console.log('No hay cambios válidos para guardar');
      this._modalInstance.hide();
    }
  }

  closeModal() {
    if (this._modalInstance) {
      this._modalInstance.hide();
      this.formErrors = {};
    }
  }
}
