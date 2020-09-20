import { Component, Input } from '@angular/core';
import { BusData } from 'src/app/services/public-transport/bus-services.model';

@Component({
  selector: 'app-bus-status',
  templateUrl: './bus-status.component.html',
  styleUrls: ['./bus-status.component.scss']
})
export class BusStatusComponent {
  @Input() buses: Array<BusData>;
}
