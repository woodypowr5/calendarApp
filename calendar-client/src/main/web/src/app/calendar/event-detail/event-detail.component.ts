import { Event } from './../../types/event';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() events: Event[];
  private editEventForm: FormGroup;
  private createEventForm: FormGroup;
  private editingEvent: Event = null;

  constructor() {
    this.editEventForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'time': new FormControl(null, [Validators.required]),
      'location': new FormControl(null, [Validators.required]),
      'notes': new FormControl(null)
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
    const newEvent = {
      id: this.editingEvent.id,
      name: this.editingEvent.name,
      datetime: this.editingEvent.datetime,
      location: this.editingEvent.location,
      notes: this.editingEvent.notes,
      duration: this.editingEvent.duration
    };
    const formattedDatetime = this.formatDatetime(this.editEventForm.get('time').value);
    console.log(this.editEventForm.get('name'));
  }

  formatDatetime(timeInHours: number): string {
    const eventDate = this.events[0].datetime;
    return "";
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
