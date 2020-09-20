import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PublicTransportService } from './public-transport.service';
import * as dummyBusServices from './../../../assets/bus-services-data.json';

describe('PublicTransportService', () => {
  let service: PublicTransportService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
    });

    service = TestBed.inject(PublicTransportService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve bus services', () => {

    service.getBusServices().subscribe(busServices => {
      expect(busServices).toEqual(dummyBusServices);
    });

    const request = httpMock.expectOne('./assets/bus-services-data.json');
    expect(request.request.method).toBe('GET');
    request.flush(dummyBusServices);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
