import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { EventListService } from './event-list.service';
import { Event } from '../home/event.models';
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
  selector: 'em-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private isCalendarShowed: boolean = false;
  private events: Event[] = [];
  view: string = 'month';
  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];
  subscription: Subscription;
  eventChanged = new Subject<any>();

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
  testEvent: Event = {
    id: 6,
    name: 'Sportowy',
    endingTime: new Date(),
    eventType: 'Sport',
    startingTime: new Date(2017, 12, 12)
  }
  addEvent() {
    this.el.addEvent(this.testEvent);  
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
      console.log(this.calendarEvents);
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
