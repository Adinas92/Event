import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page404/page404.component';
import {HomeModule} from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
