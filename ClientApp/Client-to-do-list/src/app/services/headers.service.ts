import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private client:HttpClient) { 
  }

  TokenHeaders():HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });
  }

  JsonContentHeaders():HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8'
    });
  }
}
