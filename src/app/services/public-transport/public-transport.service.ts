import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusServices } from './bus-services.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// Named as PublicTransportService so that we can
// add requests for other means of transport
export class PublicTransportService {

  constructor(public http: HttpClient) { }

  // implemented as a http request so that we can replace
  // the static file for an api Uri
  public getBusServices(): Observable<BusServices> {
    return this.http.get<BusServices>('./assets/bus-services-data.json')
      .pipe(
        tap()
      );
  }
}
