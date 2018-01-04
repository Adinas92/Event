import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page404/page404.component';
import { UserEventListComponent } from './home/right-menu/user-event-list/user-event-list.component';
import { EventListComponent } from './home/right-menu/event-list/event-list.component';
import { RightMenuComponent } from './home/right-menu/right-menu.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: RightMenuComponent, children: [
      { path: '', component: EventListComponent },
      { path: 'mylist', component: UserEventListComponent }
    ]}]
  },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
