import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BusFeedComponent } from './components/bus-feed/bus-feed.component';
import { BusStatusComponent } from './components/bus-feed/bus-status/bus-status.component';
import { RouteVariantFormatterPipe } from './pipes/route-variant-formatter.pipe';
import { BusStatusFormatterPipe } from './pipes/bus-status-formatter.pipe';
import { NoteComponent } from './components/organisation/notes/notes.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BusFeedComponent,
    BusStatusComponent,
    RouteVariantFormatterPipe,
    BusStatusFormatterPipe,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
