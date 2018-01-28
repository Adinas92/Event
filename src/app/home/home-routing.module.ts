import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { Page404Component } from './page404/page404.component';
import { UserEventListComponent } from './main/right-menu/user-event-list/user-event-list.component';
import { EventListComponent } from './main/right-menu/event-list/event-list.component';
import { RightMenuComponent } from './main/right-menu/right-menu.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuardGuard],
    children: [{
      path: '', component: MainComponent,
      children: [
        {
          path: '', component: RightMenuComponent, children: [
            { path: '', component: EventListComponent },
            { path: 'mylist', component: UserEventListComponent }
          ]
        },
      ]
    },
    { path: 'contact', component: ContactComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
