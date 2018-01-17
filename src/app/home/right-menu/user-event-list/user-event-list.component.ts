import { Component, OnInit, Input} from '@angular/core';
import { EventListService } from '../../event-list.service';
import { Coords, marker, Event } from '../../event.models';
import { aborNewEventAnimation } from '../../../shared/animations/event-list-animations';
import { Subject } from 'rxjs/Subject';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'em-user-event-list',
  templateUrl: './user-event-list.component.html',
  styleUrls: ['./user-event-list.component.scss'],
  animations: [aborNewEventAnimation]
})
export class UserEventListComponent implements OnInit {
  @Input() sumListEvents: number;
  private newEventCoords: Coords;
  private events: Event[] = [];
  private stateNewEvent: string = "newEventBoxActive";
  private newEventBoxState: boolean = false;
  private saveInfoShow: boolean = false;
 // refresh: Subject<any> = new Subject();
 private event: Event = {
  name: '',
  endingTime: new Date(),
  eventType: '',
  startingTime: new Date()
};

  private myEventsMarker: marker[] = [
	  {
		  lat: 52.200049,
		  lng: 21.016132,
		  label: 'A',
		  draggable: false
	  },

  ];

  constructor(private dataService: EventListService) { 

  }

  ngOnInit() {
    this.dataService.getEvents()
    .subscribe(
    (events) => {
      this.events = events;      
    });
    
  }
    //this.getNewEventLocation();
    // let loadSubscription = this.sumListEvents.subscribe(
    //   value => {
    //     this.events = this.dataService.showEvents(value)
    //   }
    // )
  
  ngOnChanges(changes: SimpleChanges) {
    
    if (changes.sumListEvents.previousValue) {
      this.dataService.showEvents(this.sumListEvents)
    }
  }
  ngDoCheck() {
    this.newEventBoxState = this.dataService.getNewEventInEdition();
    if(this.newEventBoxState)
    {
      this.stateNewEvent = "newEventBoxActive"
    }
    else {
      this.stateNewEvent = "newEventBoxInActive"
    }
  }

  // getNewEventLocation() {
  //   if(this.dataService.addNewEvent != null)
  //   {
  //     this.newEventCoords = this.dataService.newEventCoords;
  //     this.marker = {
  //       lat: this.newEventCoords.lat, 
  //       lng: this.newEventCoords.lng, 
  //       label: 'New',
  //       draggable: true};
  //     this.myEventsMarker.push(this.marker);
  //   }
  // }


  private abortAddingNewEvent()
  {
    this.dataService.popNewMarker();
    this.dataService.setNewEventInEdition(false);
  }
  testEvent: Event = {
    id: 6,
    name: 'Sportowy',
    endingTime: new Date(2005, 1, 4),
    eventType: 'Sport',
    startingTime: new Date(2005, 1, 4)
  }
  private saveNewEvent()
  {
    // metoda dodajaca event do bazy jednak czeka on na moderacje moderatora i dopiero wtedy mozna wywolac metode addEvent()
    // this.dataService.saveNewEvent(this.testEvent);
    this.dataService.addEvent(this.testEvent);
    this.dataService.setNewEventInEdition(false);
    this.saveInfoShow = true;
  }
  private checkStartDateIsLessThenEndDate() {
    if (this.event.startingTime > this.event.endingTime) {
      this.event.endingTime = this.event.startingTime;
    }
  }
}