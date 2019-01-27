import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { StoreService } from './../store.service';
import { AuthDetailsService }   from './../auth-details.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nameValue;
  emailvalue;
  passwordValue;

  constructor(private router: Router, public auth: AuthDetailsService , public store: StoreService) { }

  ngOnInit() {
  }

  register(){
    const obj = {
      displayName: this.nameValue,
      email: this.emailvalue,
      password: this.passwordValue
    }


    this.auth.doRegister(obj).then(res => {
      this.store.showsuccess('registeration successfull' , 'sucess');
      this.auth.goToLogin();
    }),
    err => {
      this.store.showError('There was an error in registeration' , 'error');
    }
  }

  

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
