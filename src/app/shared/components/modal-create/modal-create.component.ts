import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

interface OrderCreate {
  tipo: string;
  descripcion: string;
  fechaOrden: string;
  estado: string;
  placaVehiculo: string;
}

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [
    FormsModule
  ],
  standalone: true
})
export class ModalCreateComponent {
  order: OrderCreate = {
    tipo: 'MANTENIMIENTO',
    descripcion: '',
    fechaOrden: new Date().toISOString().split('T')[0],
    estado: 'PENDIENTE',
    placaVehiculo: ''
  };
  
  private modalInstance: any;

  @Output() orderCreated = new EventEmitter<OrderCreate>();

  constructor(private orderService: OrderService) {}

  openModal() {
    const modalElement = document.getElementById('modalCreate');
    if (modalElement) {
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  saveOrder() {
    this.orderService.createOrder(this.order).subscribe({
      next: (response) => {
        console.log('Orden creada exitosamente:', response);
        this.orderCreated.emit(this.order);
        this.modalInstance.hide();
        // Reset form
        this.order = {
          tipo: 'MANTENIMIENTO',
          descripcion: '',
          fechaOrden: new Date().toISOString().split('T')[0],
          estado: 'PENDIENTE',
          placaVehiculo: ''
        };
      },
      error: (error) => {
        console.error('Error al crear la orden:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }
}
