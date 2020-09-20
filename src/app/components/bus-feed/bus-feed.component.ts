import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { PublicTransportService } from './../../services/public-transport/public-transport.service';
import { Organisation } from 'src/app/services/public-transport/bus-services.model';

@Component({
  selector: 'app-bus-feed',
  templateUrl: './bus-feed.component.html',
  styleUrls: ['./bus-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusFeedComponent implements OnInit {

  public organisations: Array<Organisation>;
  public selectedOrganisations = new Array<Organisation>();

  // Assuming that there is no websocket that can push new data changes to update the bus deviations,
  // I am simply consuming the PublicTransportService and getting the dummy data

  // Considering that it might be the case or that we may receive a large payload or have to introduce new actions
  // on the component, we shall take over the control of the changeDetection and manage ourselves when to update the view.
  // This can improve drastically the component performance specially on mobile devices
  constructor(public publicTransportService: PublicTransportService, public cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getOrganisationsData();
  }

  getOrganisationsData(): void {
    this.publicTransportService.getBusServices()
      .subscribe(busServices => {
        this.organisations = busServices.data;

        //  this.toggleOrganisationSelection(this.organisations[0]);
        //  this.toggleOrganisationSelection(this.organisations[1]);

        this.cdr.markForCheck();
      });
  }

  toggleOrganisationSelection(organisation: Organisation): void {
    const index = this.selectedOrganisations.indexOf(organisation);

    if (index !== -1) {
      this.selectedOrganisations.splice(index, 1);
    }
    else {
      this.selectedOrganisations.push(organisation);
    }

    this.cdr.markForCheck();
  }

  isSelected(organisation: Organisation): boolean {
    return this.selectedOrganisations.indexOf(organisation) !== -1;
  }

}
