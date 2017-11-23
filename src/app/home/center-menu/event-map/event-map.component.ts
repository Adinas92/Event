import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'em-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMapComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;
  
  constructor() { }

  ngOnInit() {
  }

}
