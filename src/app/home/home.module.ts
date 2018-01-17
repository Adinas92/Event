import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { RightMenuComponent } from './right-menu/right-menu.component';
import { CenterMenuComponent } from './center-menu/center-menu.component';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { EventMapComponent } from './center-menu/event-map/event-map.component';
import { EventListComponent } from './right-menu/event-list/event-list.component';
import { EventListService } from './event-list.service';
import { HttpClientModule } from '@angular/common/http';
import { UserEventListComponent } from './right-menu/user-event-list/user-event-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageUploadModule } from 'angular2-image-upload';
import { CalendarModule } from 'angular-calendar';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhn7hPw3Quu3b0rqsem0gRatZfG0I90pw'
    }),
    AgmSnazzyInfoWindowModule,
    BrowserAnimationsModule,
    ImageUploadModule.forRoot(),
    CalendarModule.forRoot(),
    DateTimePickerModule,
    FormsModule,
    InfiniteScrollModule
  ],
  declarations: [HomeComponent,  LeftMenuComponent, RightMenuComponent, CenterMenuComponent, EventMapComponent, EventListComponent, UserEventListComponent],
  providers: [EventListService]
})
export class HomeModule { }
