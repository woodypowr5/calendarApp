import { Constants } from './../data/constants';
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    console.log(this.activeDate);
    this.populateDateCells();
  }

  findFirstDateOffset(date: Date): number {
    const firstOfMonth: Date = date;
    firstOfMonth.setDate(1);
    return firstOfMonth.getDay();
  }

  populateDateCells(): void {
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

  clearDateCells(): void {
    this.dateCells.map(cell => {
      cell = null;
    });
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

  setActiveDate(index: number): void {
    this.activeDate = this.dateCells[index];
  }
}
