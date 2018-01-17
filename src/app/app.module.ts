import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page404/page404.component';
import {HomeModule} from './home/home.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClickOutsideSearchBoxDirective } from './shared/click-outside-search-box.directive';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    Page404Component,
    ClickOutsideSearchBoxDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
