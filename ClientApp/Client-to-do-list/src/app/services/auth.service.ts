import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { UserLogin } from '../models/UserLogin';

import {API_PATH} from '../global_settings'
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client:HttpClient, private headers:HeadersService) {
    
  }
   
   Login(user:UserLogin){
      return this.client.post(`${API_PATH}api/auth`, 
                                user, 
                                {headers:this.headers.TokenHeaders()});
    }
}
