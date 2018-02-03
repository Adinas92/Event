import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EventE, PointE, EventSearching } from './event.models';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventListService {

  // to do zmiany tak nie powinno sie hardcodowac linku
  private readonly baseUrl = 'http://145.239.87.108:8080/allEvents';
  private readonly searchUrl = 'http://145.239.87.108:8080/search';
  private readonly saveUrl = 'http://145.239.87.108:8080/addEvent';
  private events: EventE[] = [];
  private newEventInEdition: boolean = false;
  private myListMarkers: PointE[] = [];
  private newPointChanges = new BehaviorSubject<any>([]);
  private eventChanged = new BehaviorSubject<any>([]);
  private eventsNumberToGet: number;
  private newPoint: PointE;
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private foundedEvents: EventE[];
  private searchingEvent: EventSearching;
  private leftUpMapCorner: PointE;
  private rightBottomMapCorner: PointE;

  constructor(private http: HttpClient) { 
    this.refetch(); 
  }
  private refetch(): void {
    this.http.get<EventE[]>(this.baseUrl, {withCredentials: true})
      .subscribe(events => {
        if(events && events instanceof Array && events.length > 0){
        this.events = events;
         this.eventChanged.next(events);
        }
      });
  }
  getEvents(): Observable<any> {
    return this.eventChanged.asObservable();
  }


  showEvents(): void {
    this.http.get<EventE[]>(this.baseUrl, {withCredentials: true})
      .subscribe(events => {
        events.forEach(event => {
          this.events.push(event);
        })
        this.eventChanged.next(this.events.slice());
      });
  }

  // tworzymy metode ktora będzie strumieniem (czyli bedzie mozna z niej subskrybowac)
  searchEvent(searchingEventName: string): Observable<EventE[]> {
    this.searchingEvent = {
      name: searchingEventName,
      point1: this.leftUpMapCorner,
      point2: this.rightBottomMapCorner
    }
    return this.http.post(this.searchUrl, this.searchingEvent, { withCredentials: true })
      .map(response => response as EventE[]);
  }

  addNewPoint(lat: Number, lng: Number){
    this.myListMarkers.push(this.newPoint = {
      latitude:lat,
      longitude:lng,
      draggable: true
    });
    this.newPointChanges.next(this.newPoint);
  }

  getNewMarkerCoordinate(): Observable<any> {
    return this.newPointChanges.asObservable();
   }

  saveNewEvent (event: EventE) {
    event.beginningDateTime = moment(event.beginningDateTime).format('DD-MM-YYYY hh:mm');
    event.endingDateTime = moment(event.endingDateTime).format('DD-MM-YYYY hh:mm');
    this.http.post(this.saveUrl, event, {headers: this.headers, withCredentials: true, responseType: 'text'})
    .subscribe(res => {
      console.log(res);  
    },
  error => {
    console.log(error);
  });
  }
  popNewMarker(): void {
    this.myListMarkers.pop();
    this.newPointChanges.next(this.newPoint = {
      latitude:null,
      longitude:null,
      draggable:false
    });
  }
  getNewEventInEdition() : boolean{
    return this.newEventInEdition;
  }
  setNewEventInEdition(isEdited) {
    this.newEventInEdition = isEdited;
  }
  setNewCorners(leftUpMapCorner: PointE, rightBottomMapCorner: PointE) {
    this.leftUpMapCorner = leftUpMapCorner;
    this.rightBottomMapCorner = rightBottomMapCorner;
  }
}
