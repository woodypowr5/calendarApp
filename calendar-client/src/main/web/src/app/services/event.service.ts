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
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get<Event[]>('http://localhost:8080/rest/events').subscribe( data => {
      this.events = data;
      this.eventsChanged.next(this.events);
    });
  }

  createEvent(event: Event): void {
    const request = this.http.put('http://localhost:8080/rest/event/', {
      name: event.name,
      location: event.location,
      datetime: new Date(event.datetime),
      duration: event.duration,
      notes: event.notes
    })
    .subscribe(
      res => {
        console.log(res);
        this.fetchEvents();
      },
      err => {
        console.log('An Error occured');
      }
    );
  }

  updateEvent(event: Event): void {
    const request = this.http.post('http://localhost:8080/rest/event/' + event.id, {
      name: event.name,
      location: event.location,
      datetime: new Date(event.datetime),
      duration: event.duration,
      notes: event.notes
    })
    .subscribe(
      res => {
        this.fetchEvents();
        console.log(res);
      },
      err => {
        console.log('An Error occured');
      }
    );
  }

  deleteEvent(event: Event): void {
    this.events.map((currentEvent, index) => {
      if (currentEvent.id === event.id) {
        this.events.splice(index, 1);
      }
    });
    this.eventsChanged.next(this.events);
    this.fetchEvents();
  }
}
