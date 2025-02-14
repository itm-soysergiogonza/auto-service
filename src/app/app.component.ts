import { Component } from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {FeaturesModule} from './features/features.module';

@Component({
  selector: 'app-root',
  imports: [SharedModule, FeaturesModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title:string = 'auto-services';
}
