import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventService } from './services/event.service';
import { EventDetailComponent } from './calendar/event-detail/event-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
