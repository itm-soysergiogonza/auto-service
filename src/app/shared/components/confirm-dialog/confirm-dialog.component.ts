import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  @Output() confirmed = new EventEmitter<void>();
  private _modalInstance: any;
  isVisible = false;

  constructor(private _elementRef: ElementRef) {}

  show() {
    this.isVisible = true;
    setTimeout(() => {
      const modalElement = this._elementRef.nativeElement.querySelector('#confirmDialog');
      if (modalElement) {
        this._modalInstance = new (window as any).bootstrap.Modal(modalElement);
        this._modalInstance.show();
      }
    });
  }

  confirm() {
    this.confirmed.emit();
    this.close();
  }

  close() {
    if (this._modalInstance) {
      this._modalInstance.hide();
      this.isVisible = false;
    }
  }
} 