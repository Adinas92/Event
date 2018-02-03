import { Component, OnInit, Input } from '@angular/core';
import { EventListService } from '../../event-list.service';
import { EventE } from '../../event.models';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'em-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() sumListEvents: number;

  private events: EventE[] = [];
 
  constructor(private dataService: EventListService) { 
  }

  ngOnInit() {
    this.dataService.getEvents().subscribe(
      (events) => {
        this.events = events;
        console.log(events);
      }
    )};
    ngOnChanges(changes: SimpleChanges) {
    
      if (changes.sumListEvents.previousValue) {
        this.dataService.showEvents()
      }
    }
}
