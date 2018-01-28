import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { EventListService } from './event-list.service';
import { EventE } from '../main/event.models';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'em-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private isCalendarShowed: boolean = false;
  private events: EventE[] = [];
  private view: string = 'month';
  private viewDate: Date = new Date();
  private calendarEvents: CalendarEvent[] = [];
  //public subscription: Subscription;
  public eventChanged = new Subject<any>();

  
  constructor(private el: EventListService) {
    
   }

  
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };

  }
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  ngOnInit() {
    this.el.getEvents()
      .subscribe(
      (events) => {
        this.events = events;
        this.getInterestedEvents();
      });
  }

  
  private getInterestedEvents() {
    
    this.calendarEvents = [];
    this.events.forEach(eachEvent => {
      let calendarEvent: CalendarEvent = {
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        title: eachEvent.name,
        color: colors.red
      }
      //console.log(this.calendarEvents);
      this.calendarEvents.push(calendarEvent);
    })
    this.calendarEvents = this.calendarEvents.slice();
  }
  showCalendar($event) {
    this.isCalendarShowed = $event;
  }
  abortCalendar() {
    this.isCalendarShowed = false;
  }
  
}
