import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { UserLogin } from '../models/UserLogin';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly path:string = 'https://localhost:5000/';
  private headers:HttpHeaders;

  constructor(private client:HttpClient) {
    
   }

    GetTasks(){
       this.headers = new HttpHeaders({
        //'Content-Type': 'application/json; charset=utf8',
        //'Authorization': "Bearer "+localStorage.getItem('token'),
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      });   
    return this.client.get(`${this.path}tasks`, {headers:this.headers});
    }
  
    GetCategories(){
    return this.client.get(`${this.path}categories`, {headers:this.headers});
    }

    Login(user:UserLogin){
      return this.client.post(`${this.path}api/auth`, 
                                user, 
                                {headers:this.headers});
    }
}
