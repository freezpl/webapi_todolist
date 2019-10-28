import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor( private router:Router ) { }

  loadDataError(data){
    switch(data.status){
      case 401:
        this.router.navigateByUrl('/account');
      default:
    }
  }

}
