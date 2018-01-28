import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page404/page404.component';
import {MainModule} from './main/main.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClickOutsideSearchBoxDirective } from './shared/click-outside-search-box.directive';
import { HomeRoutingModule } from './home-routing.module';
import { AuthGuardGuard } from '../auth-guard.guard';


@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    Page404Component,
    ClickOutsideSearchBoxDirective,
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    MainModule,
    ReactiveFormsModule
    
  ],
  providers:[AuthGuardGuard],
  exports:[HomeComponent]
})
export class HomeModule { 

}
