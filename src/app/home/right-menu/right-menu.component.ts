import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'em-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {

  @Output() showCalendar: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  showCalendarClick(): void {
    this.showCalendar.emit(true);
  }
}
