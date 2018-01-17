import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Event, Coords, marker } from './event.models';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EventListService {

  // to do zmiany tak nie powinno sie hardcodowac linku
  private readonly baseUrl = 'http://localhost:3000/events';
  private events: Event[] = [];
  private newEventInEdition: boolean = false;
  private myListMarkers: marker[] = [];
  private eventChanged = new BehaviorSubject<any>([]);
  private eventsNumberToGet: number;

  constructor(private http: HttpClient) { 
    this.refetch();
  }
  private refetch(): void {
    this.http.get<Event[]>(this.baseUrl)
      .subscribe(events => {
        this.events = events;
         this.eventChanged.next(events);
      });
  }

  addEvent(event: Event) {
    this.events.push(event);
    this.eventChanged.next(this.events.slice());
  }

  getEvents(): Observable<any> {
    return this.eventChanged.asObservable();
  }


  showEvents(eventsNumberToGet: number): void {
    this.http.get<Event[]>(this.baseUrl)
      .subscribe(events => {
        events.forEach(event => {
          this.events.push(event);
        })
         this.eventChanged.next(this.events.slice());
      });   
  }

  // tworzymy metode ktora będzie strumieniem (czyli bedzie mozna z niej subskrybowac)
  searchEvent(query: string): Observable<Event[]> {
    const url = `${this.baseUrl}/search/event?q=${query}`;
    return this.http.get<Event[]>(url)
    .map(response => response as Event[]);
  }

  addNewEvent(lat: number, lng: number){
    this.myListMarkers.push(
      {
        lat:lat,
        lng:lng,
        label:"New",
        draggable:true
      }
    )
  }
  saveNewEvent (event: Event) {
    this.http.post(this.baseUrl, event)
    .subscribe(res => console.log(res))
  }
  getListOfMyEventsMarkers(): marker[] { 
    return this.myListMarkers;
  }
  popNewMarker(): void {
    this.myListMarkers.pop();
  }
  getNewEventInEdition() : boolean{
    return this.newEventInEdition;
  }
  setNewEventInEdition(isEdited) {
    this.newEventInEdition = isEdited;
  }
}
