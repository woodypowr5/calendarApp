import { Constants } from './../data/constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private dateCells:  Date[] = Array(Constants.numDateCells).fill(null);
  private currentDate: Date = new Date();
  private activeDate: Date;

  constructor() { }

  ngOnInit() {
    this.activeDate = this.currentDate;
    this.populateDateCells();
  }

  findFirstDateOffset(date: Date): number {
    const firstOfMonth: Date = date;
    firstOfMonth.setDate(1);
    return firstOfMonth.getDay();
  }

  populateDateCells() {
    this.clearDateCells();
    const offsetForMonth = this.findFirstDateOffset(this.activeDate) - 1;
    this.dateCells.map((cell, index) => {
      console.log(this.daysInMonth(this.activeDate.getMonth(), this.activeDate.getFullYear() + offsetForMonth));
      if (
        index - offsetForMonth < 1 ||
        index - offsetForMonth > this.daysInMonth(this.activeDate.getMonth(), this.activeDate.getFullYear() + offsetForMonth)
      ) {
        this.dateCells[index] = null;
      } else {
        this.dateCells[index] = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), index - offsetForMonth);
      }
    });
  }

  daysInMonth(month, year): number {
    return new Date(year, month, 0).getDate();
  }

  clearDateCells() {
    this.dateCells.map(cell => {
      cell = null;
    });
  }

  nextMonth() {
    const currentMonth = this.activeDate.getMonth();
    if (currentMonth === 11) {
      this.activeDate.setMonth(0);
    } else {
      this.activeDate.setMonth(this.activeDate.getMonth() + 1);
    }
    this.populateDateCells();
  }

  prevMonth() {
    const currentMonth = this.activeDate.getMonth();
    if (currentMonth === 0) {
      this.activeDate.setMonth(11);
    } else {
      this.activeDate.setMonth(this.activeDate.getMonth() - 1);
    }
    this.populateDateCells();
  }
}
