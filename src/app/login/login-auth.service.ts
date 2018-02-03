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

  private readonly loginUserUrl = 'http://145.239.87.108:8080/logUser';
  private readonly logoutUserUrl = 'http://145.239.87.108:8080/logoutUser';
  private readonly loggedUserUrl = 'http://145.239.87.108:8080/loggedUser';

  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  //private headers2 = new HttpHeaders().set('Content-Type', 'text/plain;');
  private response = new BehaviorSubject<any>([]);
  private isValidUser: boolean;
  private user: string;
  constructor(private http: HttpClient, private routerService:Router) {

   }


  loginUser(userLogin: UserLogin) {
     this.http.post(this.loginUserUrl, userLogin, {headers: this.headers, withCredentials: true, responseType: 'text'})  
       .subscribe(res => {
        this.isValidUser = true;
        this.response.next(true);
        this.getLoggedUser();
      },
    error => {
      this.isValidUser = false;
      this.response.next(false);
    });   
    };
  getLoggedUser() {
    this.http.get(this.loggedUserUrl, { withCredentials: true, responseType:'text'})
    .subscribe(user => {
      this.response.next(user);
      }
    );
  }
  logout() {
    this.http.get(this.logoutUserUrl, {withCredentials: true, responseType:'text'})
    .subscribe(res => {
      console.log(res);
      this.response.next(false);
      this.routerService.navigateByUrl('/login');
      },
      error => {
        console.log(error);
        this.response.next(false);
        this.routerService.navigateByUrl('/login');
      })
    }; 

  isValid(): Observable<boolean> {
    return this.response.asObservable();
  }
  loggedUser(): Observable<string> {
    return this.response.asObservable();
  }
 getIsValidUser(): boolean {
   return this.isValidUser;
 }
}
