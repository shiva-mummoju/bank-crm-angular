import { Component, OnInit } from '@angular/core';
import { AuthDetailsService } from './../auth-details.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  events: string[] = [];
  opened: boolean = true;
  shouldRun = true;

  constructor(public auth : AuthDetailsService) { }



  ngOnInit() {
  }

  goToLogin(){
    this.auth.goToLogin();
  }

}
