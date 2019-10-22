import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { UserLogin } from '../models/UserLogin';
import { API_PATH } from '../global_settings'
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private client:HttpClient, private headers:HeadersService) {
    
   }

    GetTasks(){ 
    return this.client.get(`${API_PATH}tasks`, {headers:this.headers.TokenHeaders()});
    //return this.client.get(`${API_PATH}tasks`, {headers:this.headers.TokenHeaders()});
    }
  
    GetCategories(){
    return this.client.get(`${API_PATH}categories`, {headers:this.headers.TokenHeaders()});
    }

}
