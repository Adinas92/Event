import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from './login-auth.service';
import { UserLogin } from '../app.models';
import { Router } from '@angular/router';

@Component({
  selector: 'em-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private redirect = "/";
  private isLoading = false;
  private userLogin: UserLogin = {
  login: null,
  password: null
  };
  private wrongUserNameOrPassword: boolean = false;
  constructor(private loginService:LoginAuthService, private router: Router) { }

  ngOnInit() {
  }

  logInUser() {
    this.isLoading = true;
    this.loginService.loginUser(this.userLogin);
    this.loginService.isValid()
      .subscribe(
      (authenitcation) => {
        if (authenitcation) {
          this.router.navigate(["/"]);
        }
        else {
          this.isLoading = false;
          this.wrongUserNameOrPassword = true;
          console.log('Niezalogowano');
          this.router.navigate(["/login"]);
        }
    });
  }
}
