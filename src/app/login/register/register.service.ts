import { Injectable } from '@angular/core';
import { User } from '../../app.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegisterService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  private readonly registerUrl = 'http://145.239.87.108:8080/registerUser';
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(newUser: User) {
    this.http.post(this.registerUrl, newUser, { headers: this.headers, withCredentials: true, responseType: 'text' })
      .subscribe(res => {
        console.log(res);
        this.router.navigate(["/"]);
      },
      error => {
        console.log(error);
      });
  }
}
