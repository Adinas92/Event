import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { LoginAuthService } from './login/login-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent

  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [LoginAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
