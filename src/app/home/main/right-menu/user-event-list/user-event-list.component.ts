import { Component, OnInit, Input} from '@angular/core';
import { EventListService } from '../../event-list.service';
import { EventE, PointE } from '../../event.models';
import { aborNewEventAnimation } from '../../../shared/animations/event-list-animations';
import { Subject } from 'rxjs/Subject';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import * as moment from 'moment';

@Component({
  selector: 'em-user-event-list',
  templateUrl: './user-event-list.component.html',
  styleUrls: ['./user-event-list.component.scss'],
  animations: [aborNewEventAnimation]
})
export class UserEventListComponent implements OnInit {
  @Input() sumListEvents: number;
  private newEventCoords: PointE;
  private events: EventE[] = [];
  private stateNewEvent: string = "newEventBoxActive";
  private newEventBoxState: boolean = false;
  private saveInfoShow: boolean = false;
 // refresh: Subject<any> = new Subject();
 private newPoint: PointE;
  private newEvent: EventE = {
    name: '',
    address: {
      city: '',
      street: '',
      number: null
    },
    endingDateTime: null,
    eventType: '',
    beginningDateTime: null,
    point: null,
    confirm: false
  };

  constructor(private dataService: EventListService) { 
   
  }

  ngOnInit() {
    this.dataService.getEvents()
    .subscribe(
    (events) => {
      this.events = events;     
    });
    this.dataService.getNewMarkerCoordinate().subscribe(
      (newPoint) => {
        this.newPoint = {
          latitude: newPoint.latitude,
          longitude: newPoint.longitude,
          draggable: newPoint.draggable
        };
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
      this.dataService.showEvents()
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

  private abortAddingNewEvent() {
    this.dataService.popNewMarker();
    this.dataService.setNewEventInEdition(false);
    this.newPoint = {
      latitude: null,
      longitude: null,
      draggable: false
    }
  }
  // metoda dodająca przez Usera nowy Event
  // addEvent() {
  //   this.dataService.addEvent(this.newEvent);
  //   this.dataService.setNewEventInEdition(false);
  //   this.saveInfoShow = true;  
  // }
  // metoda zapisująca nowy event do bazy przez Admina
  private saveNewEvent()
  {
    this.newEvent.point = this.newPoint;
    this.dataService.saveNewEvent(this.newEvent);
    this.dataService.setNewEventInEdition(false);
    this.saveInfoShow = true;
  }
  private checkStartDateIsLessThenEndDate() {
    if (this.newEvent.beginningDateTime > this.newEvent.endingDateTime) {
      this.newEvent.endingDateTime = this.newEvent.beginningDateTime;
    }
  }
}