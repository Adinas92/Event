import { Component, OnInit } from '@angular/core';
import { User } from '../../app.models';
import { RegisterService } from './register.service';

@Component({
  selector: 'em-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private isLoading=false;
 private newUser: User = {
    email: null,
    firstName: null,
    lastName: null,
    password: null
  };
  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  registerUser()
  {
    this.isLoading = true;
    this.registerService.registerUser(this.newUser);
  }
}
