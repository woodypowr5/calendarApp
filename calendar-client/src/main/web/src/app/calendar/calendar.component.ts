import { EventService } from './../services/event.service';
import { Constants } from './../data/constants';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from '../types/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private constants = Constants;
  private dateCells:  Date[] = Array(this.constants.numDateCells).fill(null);
  private currentDate: Date = new Date();
  private activeDate: Date = new Date();
  private activeEvents: Event[] = [];
  private offsetForMonth: number;
  private events: Event[] = [];
  private eventSubscriptions: Subscription[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.populateDateCells();
    this.eventSubscriptions.push(this.eventService.eventsChanged.subscribe(events => {
      this.events = events;
      console.log(events);
    }));
  }

  findFirstDateOffset(date: Date): number {
    const firstOfMonth: Date = date;
    firstOfMonth.setDate(1);
    return firstOfMonth.getDay();
  }

  populateDateCells(): void {
    this.clearDateCells();
    this.offsetForMonth = this.findFirstDateOffset(this.activeDate) - 1;
    const daysInMonth = this.daysInMonth(this.activeDate.getMonth() + 1, this.activeDate.getFullYear() + this.offsetForMonth);
    this.dateCells.map((cell, index) => {
      if (
        index - this.offsetForMonth < 1 ||
        index - this.offsetForMonth > daysInMonth
      ) {
        this.dateCells[index] = null;
      } else {
        this.dateCells[index] = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), index - this.offsetForMonth);
      }
    });
  }

  daysInMonth(month, year): number {
    return new Date(year, month, 0).getDate();
  }

  clearDateCells(): void {
    this.dateCells = Array(this.constants.numDateCells).fill(null);
  }

  nextMonth(): void {
    const currentMonth = this.activeDate.getMonth();
    if (currentMonth === 11) {
      this.activeDate.setMonth(0);
      this.activeDate.setFullYear(this.activeDate.getFullYear() + 1);
    } else {
      this.activeDate.setMonth(this.activeDate.getMonth() + 1);
    }
    this.populateDateCells();
  }

  prevMonth(): void {
    const currentMonth = this.activeDate.getMonth();
    if (currentMonth === 0) {
      this.activeDate.setMonth(11);
      this.activeDate.setFullYear(this.activeDate.getFullYear() - 1);
    } else {
      this.activeDate.setMonth(this.activeDate.getMonth() - 1);
    }
    this.populateDateCells();
  }

  setActiveDate(index: number, date: Date): void {
    if (this.activeDate[index] !== null) {
      this.activeDate = this.dateCells[index];
    }
    this.setActiveEvents(date);
  }

  setActiveEvents(date: Date) {
    const daysEvents: Event[] = [];
    this.events.map(event => {
      if (this.isSameDay(new Date(event.datetime), date)) {
        daysEvents.push(event);
      }
    });
    this.activeEvents = daysEvents;
  }

  eventsForDate(date: Date): Event[] {
    const daysEvents: Event[] = [];
    this.events.map(event => {
      if (this.isSameDay(new Date(event.datetime), date)) {
        daysEvents.push(event);
      }
    });
    return daysEvents;
  }

  isSameDay(date1: Date, date2: Date) {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  getFormattedTime(datetime: string): string {
    const date = new Date(datetime);
    return '' + date.getHours();
  }

  updateEvent(event: Event) {
    this.eventService.updateEvent(event);
  }
}
