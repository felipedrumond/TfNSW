import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'routeVariantFormatter'
})
export class RouteVariantFormatterPipe implements PipeTransform {

  private bold = 'font-weight: bold';

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, ...args: unknown[]): SafeHtml {
    if (value === 'UNKNOWN') {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }

    const part1 = value.substr(0, 3);
    const rest = value.substr(4);

    let html = `<span style='${this.bold};'>${part1}</span>`;
    if (rest) {
      html += ` ${rest.trim()}`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
