import { RouteVariantFormatterPipe } from './route-variant-formatter.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

describe('RouteVariantFormatterPipe', () => {

  let pipe: RouteVariantFormatterPipe;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BrowserModule,
    ],
  }));

  beforeEach(inject([DomSanitizer], domSanitizer => {
    pipe = new RouteVariantFormatterPipe(domSanitizer);
  }));

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const localPipe = new RouteVariantFormatterPipe(domSanitizer);
    expect(localPipe).toBeTruthy();
  }));

  it('UNKNOWN value returns UNKNOWN', () => {
    const unknown = 'UNKNOWN';
    const transformed = pipe.transform(unknown);
    const safeHtml = transformed[Object.keys(transformed)[0]];

    expect(safeHtml).toBe(unknown);
  });

  it('known value returns formated value', () => {
    const transformed = pipe.transform('891 2 1');
    const safeHtml = transformed[Object.keys(transformed)[0]];

    expect(safeHtml).toBe(`<span style='font-weight: bold;'>891</span> 2 1`);
  });

  it('known short value returns formated value', () => {
    const transformed = pipe.transform('89');
    const safeHtml = transformed[Object.keys(transformed)[0]];
    expect(safeHtml).toBe(`<span style='font-weight: bold;'>89</span>`);
  });

});
