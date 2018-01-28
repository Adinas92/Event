import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'em-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit {

  showWorldList: boolean = true;
  showMyList: boolean = false;
  sumListEvents: number = 20;
  throttle = 300;
  scrollDistance = 7;
  scrollUpDistance = 1;
  direction = 'down';

   @Output() showCalendar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      if(this.router.url === '/mylist') {
        this.showWorldList = false;
        this.showMyList = true;
      }
      else {
        this.showWorldList = true;
        this.showMyList = false;
      }
    }
  )}

  ngOnInit() {
    
  }

  showCalendarClick(): void {
    this.showCalendar.emit(true);
  }
  onScrollDown () {
    console.log('scrolled down!!');
    this.sumListEvents += 20;
  }
  
}
