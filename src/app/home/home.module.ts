import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RightMenuComponent } from './right-menu/right-menu.component';
import { CenterMenuComponent } from './center-menu/center-menu.component';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { EventMapComponent } from './center-menu/event-map/event-map.component';
import { EventListComponent } from './right-menu/event-list/event-list.component';
import { EventListService } from './event-list.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhn7hPw3Quu3b0rqsem0gRatZfG0I90pw'
    })
  ],
  declarations: [HomeComponent, LeftMenuComponent, RightMenuComponent, CenterMenuComponent, EventMapComponent, EventListComponent],
  providers: [EventListService]
})
export class HomeModule { }
