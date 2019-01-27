import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthDetailsService} from './../auth-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:any;
  password:any;

  constructor(private router: Router, public auth: AuthDetailsService) { }

  ngOnInit() {
  }

  tryLogin(){
    console.log(this.email,this.password);
  }


  tryGoogleLogin(){
    this.auth.doGoogleLogin().then(res => {
      this.auth.user = res.user;
      this.auth.isLoggedIn = true;
      this.router.navigate(['profile']);
    },
    err => {
      console.log('error ocured whi gooog ' ,err);
    })
  }



  goToRegister() {
    this.router.navigate(['/register']);
  }

}
