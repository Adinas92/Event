import { Component, OnInit } from '@angular/core';
import { EventListService } from '../../event-list.service';
import { Event } from '../../event.models';


@Component({
  selector: 'em-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Event[] = [];
  constructor(private el: EventListService) { 
    this.getEvents();
    console.log(this.events);
  }

  ngOnInit() {
  }
  getEvents(): void {
    this.events = this.el.showAllEvents();
  }
}
