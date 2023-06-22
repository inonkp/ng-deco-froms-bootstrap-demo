import { Component } from '@angular/core';
import { DemoForm } from './demo-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-deco-forms-bootstrap-demo';
  demo = new DemoForm();
}
