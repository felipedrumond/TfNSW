import { BusStatusFormatterPipe } from './bus-status-formatter.pipe';
import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

describe('RouteVariantFormatterPipe', () => {

  let pipe: BusStatusFormatterPipe;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BrowserModule,
    ],
  }));

  beforeEach(inject([DomSanitizer], domSanitizer => {
    pipe = new BusStatusFormatterPipe(domSanitizer);
  }));

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const localPipe = new BusStatusFormatterPipe(domSanitizer);
    expect(localPipe).toBeTruthy();
  }));

  it('null deviation returns unknown in italic dargray', () => {
    const transformed = pipe.transform(null);
    const safeHtml = transformed[Object.keys(transformed)[0]];

    expect(safeHtml).toBe(`<span style='color:dargray;font-style:italic;'>unknown</span>`);
  });

  it('deviation is negative returns Early in red', () => {
    const transformed = pipe.transform(-1);
    const safeHtml = transformed[Object.keys(transformed)[0]];

    expect(safeHtml).toBe(`<span style='color:red;'>Early</span>`);
  });

  it('deviation between 0 and 240 seconds returns On Time in green', () => {
    const transformed = pipe.transform(1);
    const safeHtml = transformed[Object.keys(transformed)[0]];

    expect(safeHtml).toBe(`<span style='color:green;'>On Time</span>`);
  });

  it('deviation greater than 240 seconds returns Late in blue', () => {
    const transformed = pipe.transform(241);
    const safeHtml = transformed[Object.keys(transformed)[0]];

    expect(safeHtml).toBe(`<span style='color:blue;'>Late</span>`);
  });

});
