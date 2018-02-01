import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import { Http, Headers, Response } from '@angular/http';
import { UserLogin, User } from '../app.models';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { error } from 'selenium-webdriver';
import { isValid } from 'date-fns';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginAuthService {

  private readonly loginUserUrl = 'http://localhost:8080/logUser';
  private readonly logoutUserUrl = 'http://localhost:8080/logoutUser';
  private readonly loggedUserUrl = 'http://localhost:8080/loggedUser';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private response = new BehaviorSubject<any>([]);
  private isValidUser: boolean;
  private user: User;
  constructor(private http: HttpClient, private routerService:Router) {

   }


  loginUser(userLogin: UserLogin) {
     this.http.post(this.loginUserUrl, userLogin, {headers: this.headers, withCredentials: true, responseType: 'text'})
      .subscribe(res => {
        this.isValidUser = true;
        this.response.next(true);
      },
    error => {
      this.isValidUser = true;
      this.response.next(true);

    });
    this.http.get<User>(this.loggedUserUrl, {withCredentials: true})
      .subscribe(user => {
        this.user = user;
         this.response.next(user);
        }
      );
    };
  
  logout() {
    this.http.get(this.logoutUserUrl, {withCredentials: true})
    .subscribe(res => {
      console.log(res);
      this.routerService.navigateByUrl('/login');
      },
      error => {
        console.log(error);
        this.routerService.navigateByUrl('/login');
      })
    }; 

  isValid(): Observable<boolean> {
    return this.response.asObservable();
  }
  loggedUser(): Observable<User> {
    return this.response.asObservable();
  }
 getIsValidUser(): boolean {
   return this.isValidUser;
 }
}
