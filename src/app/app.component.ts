import { Component } from '@angular/core';

interface MenuItem {
  path: string;
  label: string;
  exact?: boolean;
}

@Component({
  selector: 'em-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tm';
  activeMenuOnSmallDevice = '';
  menu: MenuItem[] = [
    {path: '/', label: 'Events', exact: true},
    {path: '/add', label: 'Add Event'},
    {path: '/contact', label: 'Contact'},
  ];

  activeMenu(){
    if(this.activeMenuOnSmallDevice === ''){
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
}
