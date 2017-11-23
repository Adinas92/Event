import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Event } from './event.models';

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
}
