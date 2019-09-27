import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly path:string = 'https://localhost:5001/';
  private readonly headers = new HttpHeaders({
   'Content-Type': 'application/json; charset=utf8'
 });

  constructor(private client:HttpClient) {
    
   }

    GetTasks(){
    return this.client.get(`${this.path}tasks`, {headers:this.headers});
    }
  
    GetCategories(){
    return this.client.get(`${this.path}categories`, {headers:this.headers});
      }
}
