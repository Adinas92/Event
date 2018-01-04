import { Component, OnInit } from '@angular/core';
import { EventListService } from '../../event-list.service';
import { Event } from '../../event.models';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
  selector: 'em-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

 // private events: Event[] = [];
 
  constructor(private el: EventListService) { 
   // this.getEvents();

  }

  ngOnInit() {
    
  }
  // getEvents(): void {
  //   this.events = this.el.showAllEvents();
  // }
  // przez asynchroniczność dziala to w ten sposob ze zapytanie do bazy troche trwa dlatego trzeba to wywolac jeszcze
 public getAllEvents() {
    return this.el.showAllEvents();
  }
  onScroll () {
    console.log('scrolled!!')
}
}
