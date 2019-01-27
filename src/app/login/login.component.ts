import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthDetailsService} from './../auth-details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailValue:any;
  passwordValue:any;

  constructor(private router: Router, public auth: AuthDetailsService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  tryLogin(){
    this.auth.doLogin(this.emailValue, this.passwordValue).then(res => {
      console.log('login has been successfull' , res);
      this.auth.user = res.user;
      this.auth.isLoggedIn = true;
      this.toastr.success('Login successfull' , 'success');
      this.router.navigate(['profile']);
    },
    err => {
      console.log('error ocured whi normal login ' ,err);
      this.toastr.error('Login Error Occurred', 'Login Error');
    })
  }


  tryGoogleLogin(){
    this.auth.doGoogleLogin().then(res => {
      console.log('login success' , res);
      this.auth.user = res.user;
      this.auth.isLoggedIn = true;
      this.router.navigate(['profile']);
    },
    err => {
      console.log('error ocured whi gooog ' ,err);
      this.toastr.error('Login Error Occurred', 'Login Error', {
        timeOut: 3000
      });
      
    })
  }



  goToRegister() {
    this.router.navigate(['/register']);
  }

}
