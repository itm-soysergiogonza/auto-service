import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../features/order/services/order.service';
import { Order } from '../../../features/order/interfaces/order.interfaces';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class ModalCreateComponent {
  order: Order = {
    tipo: 'MANTENIMIENTO',
    descripcion: '',
    fechaOrden: new Date().toISOString().split('T')[0],
    estado: 'PENDIENTE',
    placaVehiculo: ''
  };

  formErrors: { [key: string]: string } = {};
  private _modalInstance: any;

  @Output() orderCreated = new EventEmitter<Order>();

  constructor(private _orderService: OrderService) {}

  openModal() {
    this.resetForm();
    const modalElement = document.getElementById('modalCreate');
    if (modalElement) {
      this._modalInstance = new (window as any).bootstrap.Modal(modalElement);
      this._modalInstance.show();
    }
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.order.placaVehiculo?.trim()) {
      this.formErrors['placaVehiculo'] = 'La placa del vehículo es requerida';
      isValid = false;
    }

    if (!this.order.descripcion?.trim()) {
      this.formErrors['descripcion'] = 'La descripción es requerida';
      isValid = false;
    }

    if (!this.order.fechaOrden) {
      this.formErrors['fechaOrden'] = 'La fecha es requerida';
      isValid = false;
    }

    return isValid;
  }

  saveOrder() {
    if (!this.validateForm()) {
      return;
    }

    // Limpiar espacios en blanco
    const cleanOrder: Order = {
      ...this.order,
      placaVehiculo: this.order.placaVehiculo?.trim() || '',
      descripcion: this.order.descripcion?.trim() || ''
    };

    this._orderService.createOrder(cleanOrder).subscribe({
      next: (response: Order) => {
        this.orderCreated.emit(cleanOrder);
        this._modalInstance.hide();
        this.resetForm();
      },
      error: (error: Error) => {
        console.error('Error al crear la orden:', error);
      }
    });
  }

  private resetForm() {
    this.order = {
      tipo: 'MANTENIMIENTO',
      descripcion: '',
      fechaOrden: new Date().toISOString().split('T')[0],
      estado: 'PENDIENTE',
      placaVehiculo: ''
    };
    this.formErrors = {};
  }
}
