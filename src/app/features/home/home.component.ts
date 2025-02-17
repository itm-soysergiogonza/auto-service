import { Component } from '@angular/core';
import {CrudFormComponent} from '../../shared/components/crud-form/crud-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CrudFormComponent],
  standalone: true
})
export class HomeComponent {}
