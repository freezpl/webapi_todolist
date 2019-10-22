import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/tasks.service';
import { UserLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private httpService:HttpService, private router: Router){

  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      //let token = localStorage.getItem('token');
     
      this.httpService.GetTasks().subscribe(()=>{
      }, ()=>{      
        this.router.navigateByUrl('/account');
        return false;
      }); 
      console.log('true');  
      return true;   
  }
  
}
