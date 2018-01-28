import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../app.models';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { error } from 'selenium-webdriver';
import { isValid } from 'date-fns';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class LoginAuthService {

  private readonly loginUserUrl = 'http://localhost:8080/login';
  private response = new BehaviorSubject<any>([]);
  private isValidUser: boolean;
  constructor(private http: HttpClient) { }

  //trzeba tu zrobic obserbable albo promisa zwracanego
  loginUser(userLogin: UserLogin) {
     this.http.post(this.loginUserUrl, userLogin)
      .subscribe(res => {
        console.log(res);
        this.isValidUser = true;
        this.response.next(true);
   
      },
    error => {
      console.log(error);
      this.isValidUser = false;
      this.response.next(false);

    });
  }
  isValid(): Observable<boolean> {
    return this.response.asObservable();
  }
 getIsValidUser(): boolean {
   return this.isValidUser;
 }
}
