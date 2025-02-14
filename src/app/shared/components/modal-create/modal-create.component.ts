import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent {
  order = { plate: '', serviceType: '' };
  private modalInstance: any;

  @Output() orderCreated = new EventEmitter<any>();

  openModal() {
    const modalElement = document.getElementById('modalCreate');
    if (modalElement) {
      this.modalInstance = new (window as any).bootstrap.Modal(modalElement);
      this.modalInstance.show();
    }
  }

  saveOrder() {
    this.orderCreated.emit(this.order);
    this.modalInstance.hide();
  }
}
