import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PublicTransportService } from 'src/app/services/public-transport/public-transport.service';
import { BusFeedComponent } from './bus-feed.component';
import { BusData, BusServices } from 'src/app/services/public-transport/bus-services.model';
import fakeBusServicesData from './../../../assets/bus-services-data.json';

const fakeData: BusServices = fakeBusServicesData;

const PublicTransportServiceMock = {
  getBusServices: () => of( fakeData )
};

@Component({selector: 'app-bus-status', template: ''})
class BusStatusStubComponent {
  @Input() buses: Array<BusData>;
}

describe('BusFeedComponent', () => {
  let component: BusFeedComponent;
  let fixture: ComponentFixture<BusFeedComponent>;
  let publicTransportService: PublicTransportService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BusFeedComponent,
        BusStatusStubComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        {
          provide: PublicTransportService, useValue: PublicTransportServiceMock
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusFeedComponent);
    component = fixture.componentInstance;
    publicTransportService = TestBed.inject(PublicTransportService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no selected organisations after creating', () => {
    expect(component.selectedOrganisations.length).toBe(0);
  });

  it('toggling on an organization adds the organisation to the selected organisations', () => {
    const organisation = component.organisations[0];
    component.toggleOrganisationSelection(organisation);
    expect(component.selectedOrganisations.length).toBe(1);
  });

  it('toggling off an organization removes the organisation from the selected organisations', () => {
    const organisation = component.organisations[0];
    // toggle on
    component.toggleOrganisationSelection(organisation);

    // toggle off
    component.toggleOrganisationSelection(organisation);

    expect(component.selectedOrganisations.length).toBe(0);
  });
});
