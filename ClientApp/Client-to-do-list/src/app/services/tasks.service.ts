import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { UserLogin } from '../models/UserLogin';
import { API_PATH } from '../global_settings'
import { HeadersService } from './headers.service';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private client:HttpClient, private headers:HeadersService) {
    
   }

    GetTasks(){ 
      return this.client.get(`${API_PATH}tasks`, {headers:this.headers.TokenHeaders()});
    }

    AddTask(task:Task){
      return this.client.post(`${API_PATH}tasks/add`, 
                              task,
                                {headers:this.headers.TokenHeaders()});
    }
  
    GetCategories(){
    return this.client.get(`${API_PATH}categories`, {headers:this.headers.TokenHeaders()});
    }

    GetTags(tagName:string){
      return this.client.get(`${API_PATH}tags/${tagName}`, {headers:this.headers.TokenHeaders()});
    }
}
