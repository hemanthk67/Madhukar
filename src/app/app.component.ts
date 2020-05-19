import { Component } from '@angular/core';
import { RoutingService } from './services/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TCC';
  constructor(public routingService: RoutingService) {

  }
}
