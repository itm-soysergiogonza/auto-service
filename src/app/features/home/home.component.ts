import { Component, OnInit } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { OrderService, OrderTableData } from '../../shared/services/order.service';
import {CrudFormComponent} from '../../shared/components/crud-form/crud-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CrudFormComponent],
  standalone: true
})
export class HomeComponent {}
