import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './home/contact/contact.component';
import { Page404Component } from './home/page404/page404.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './home/main/main.component';
import { RightMenuComponent } from './home/main/right-menu/right-menu.component';
import { EventListComponent } from './home/main/right-menu/event-list/event-list.component';
import { UserEventListComponent } from './home/main/right-menu/user-event-list/user-event-list.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
    {
      path: '', component: HomeComponent,
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
    { path: 'register', component: RegisterComponent },
    { path: '**', component: Page404Component }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
