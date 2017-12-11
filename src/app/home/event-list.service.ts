import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Event } from './event.models';
import 'rxjs/add/operator/map';

@Injectable()
export class EventListService {

  // to do zmiany tak nie powinno sie hardcodowac linku
  private readonly baseUrl = 'http://localhost:3000/events';
  private events: Event[] = [];

  constructor(private http: HttpClient) { 
    this.http.get<Event[]>(this.baseUrl)
    .subscribe(events => this.events = events);
    console.log(this.events);
  }

  showAllEvents(): Event[] {
    return [...this.events];
  }

  // tworzymy metode ktora będzie strumieniem (czyli bedzie mozna z niej subskrybowac)
  searchEvent(query: string): Observable<Event[]> {
    const url = `${this.baseUrl}/search/event?q=${query}`;
    return this.http.get<Event[]>(url)
    .map(response => response as Event[]);
  }

  
}
