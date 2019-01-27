import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  isLoggedIn: boolean = false ;

  constructor(private toastr: ToastrService) { }


  showError(msg , title){
    this.toastr.error(msg, title);
  }

  showsuccess(msg, title){
    this.toastr.success(msg,title);
  }

}
