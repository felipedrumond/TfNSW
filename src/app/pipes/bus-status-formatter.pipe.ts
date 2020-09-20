import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BusStatus } from '../models/bus-status.model';

@Pipe({
  name: 'busStatusFormatter'
})
export class BusStatusFormatterPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  onTime: BusStatus = {
    text: 'On Time',
    color: 'green'
  };

  late: BusStatus = {
    text: 'Late',
    color: 'blue'
  };

  early: BusStatus = {
    text: 'Early',
    color: 'red'
  };

  unknown: BusStatus = {
    text: 'unknown',
    color: 'dargray',
    style: 'italic'
  };

  transform(value: number, ...args: unknown[]): SafeHtml {
    const status = this.getStatus(value);
    const fontStyle = status.style ? `font-style:${status.style};` : '';

    const html = `<span style='color:${status.color};${fontStyle}'>${status.text}</span>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Assuming that up to 240 seconds the bus is still on time based on the image provided
  // IMO anything 90+ seconds could be considered late
  private getStatus(value: number): BusStatus {
    if (value === null) {
      return this.unknown;
    }

    if (value <= 0) {
      return this.early;
    }

    if (value <= 240) {
      return this.onTime;
    }

    return this.late;
  }
}
