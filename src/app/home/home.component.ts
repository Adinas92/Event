import { Component, Input, ChangeDetectorRef, ApplicationRef  } from '@angular/core';
import { EventListService } from './main/event-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { EventE } from './main/event.models';
import { NgZone } from '@angular/core/src/zone/ng_zone';
import 'rxjs/add/observable/fromEvent';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

interface MenuItem {
  path: string;
  label: string;
  exact?: boolean;
}

@Component({
  selector: 'em-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'tm';
  activeMenuOnSmallDevice = '';
  menu: MenuItem[] = [
    {path: '/', label: 'Home', exact: true},
    {path: '/mylist', label: 'My Events'},
    {path: '/contact', label: 'Contact'},
  ];
  query = '';
  form: FormGroup;
  events: EventE[] = [];
  showDropDown = false;
  private fullImagePath = 'https://i.imgur.com/61RrTG8.png';

  constructor(private el: EventListService, private fb: FormBuilder) {
   
    // opisanie kontrolki 
    const queryControl = this.fb.control('', [
      Validators.required, 
      Validators.minLength(3)      
    ]);
    this.form = this.fb.group({
      query: queryControl
  });
  this.form.valueChanges
  .map(({query}) => query)
  .do((y) => console.log(y, queryControl.errors))
  .debounceTime(300)
  .filter(() => this.form.valid) // filter() robi zapytanie tylko kiedy validacja jest spelniona
  .subscribe(query => this.searchEvent((query)));

}
                
  activeMenu(){
    if(this.activeMenuOnSmallDevice === '') {
      this.activeMenuOnSmallDevice = 'is-active';
    }
    else{
      this.activeMenuOnSmallDevice = '';
    }

  }
    handleClick(msg: any) {
    console.log('CLICK', msg);
    this.title += msg;
  }
searchEvent (query: string) {
  this.el.searchEvent(query)
  .subscribe(event => this.events = event)
}

toggleDropDown() {
  this.showDropDown = true;

}
hideBoxMainSearch() {
  if(this.showDropDown == true){
  this.showDropDown = !this.showDropDown;
}
}
}
