import { HttpClient } from '@angular/common/http';
import { MockData } from './../data/mockData';
import { Event } from './../types/event';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private mockBackend: Event[] = [];
  private events: Event[] = [];
  public eventsChanged: BehaviorSubject<Event[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.eventsChanged.next(MockData.events);
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get<Event[]>('http://localhost:8080/rest/events').subscribe( data => {
      this.events = data;
    });
    this.eventsChanged.next(this.events);
  }

  createEvent(event: Event): void {
    console.log(event)
    this.events.push(event);
    this.eventsChanged.next(this.events);
  }

  updateEvent(event: Event): void {
    this.events.map((currentEvent, index) => {
      if (currentEvent.id === event.id) {
        this.events.splice(index, 1);
        this.events.push(event);
      }
    });
    this.eventsChanged.next(this.events);
  }

  deleteEvent(event: Event): void {
    this.events.map((currentEvent, index) => {
      if (currentEvent.id === event.id) {
        this.events.splice(index, 1);
      }
    });
    this.eventsChanged.next(this.events);
  }
}
