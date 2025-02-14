import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {CrudFormComponent} from './components/crud-form/crud-form.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderComponent,
    CrudFormComponent,
    SearchBarComponent
  ],
  exports: [
    HeaderComponent,
    CrudFormComponent
  ]
})
export class SharedModule { }
