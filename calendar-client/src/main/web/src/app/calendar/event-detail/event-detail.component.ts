import { Event } from './../../types/event';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() events: Event[];
  @Output() createEvent: EventEmitter<Event> = new EventEmitter();
  @Output() editEvent: EventEmitter<Event> = new EventEmitter();
  private editEventForm: FormGroup;
  private createEventForm: FormGroup;
  private editingEvent: Event = null;

  constructor() {
    this.editEventForm = new FormGroup({
      'name': new FormControl(null),
      'time': new FormControl(null),
      'location': new FormControl(null),
      'notes': new FormControl(null),
      'duration': new FormControl(null)
    });
    // this.createEventForm = new FormGroup({
    //   'name': new FormControl(null, [Validators.required]),
    //   'time': new FormControl(null, [Validators.required]),
    //   'location': new FormControl(null, [Validators.required]),
    //   'notes': new FormControl(null)
    // });
  }

  ngOnInit() {}

  onSubmit() {
    const newEvent: Event = {
      id: this.editingEvent.id,
      name: this.editingEvent.name,
      datetime: this.editingEvent.datetime,
      location: this.editingEvent.location,
      notes: this.editingEvent.notes,
      duration: this.editingEvent.duration
    };
    if (this.editEventForm.get('time').value !== null) {
      const formattedDatetime = this.formatDatetime(newEvent, this.editEventForm.get('time').value);
      newEvent.datetime = formattedDatetime;
    }
    if (this.editEventForm.get('name').value !== null) {
      newEvent.name = this.editEventForm.get('name').value;
    }
    if (this.editEventForm.get('location').value !== null) {
      newEvent.location = this.editEventForm.get('location').value;
    }
    if (this.editEventForm.get('duration').value !== null) {
      newEvent.duration = this.editEventForm.get('duration').value;
    }
    if (this.editEventForm.get('notes').value !== null) {
      newEvent.notes = this.editEventForm.get('notes').value;
    }
    this.editEvent.emit(newEvent);
  }

  formatDatetime(event: Event, timeInHours: number): string {
    const eventDate = new Date(event.datetime);
    eventDate.setHours(timeInHours);
    eventDate.setMinutes(0);
    eventDate.setSeconds(0);
    eventDate.setMilliseconds(0);
    return eventDate.toString();
  }

  setEditingEvent(id: number): void {
    this.events.map(event => {
      if (event.id === id) {
        this.editingEvent = event;
      }
    });
  }

  closeEditingEvent() {
    this.editingEvent = null;
  }
}
