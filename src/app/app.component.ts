import { Component } from '@angular/core';
import {SharedModule} from './shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title:string = 'auto-services';
}
