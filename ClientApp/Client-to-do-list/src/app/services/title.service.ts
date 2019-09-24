import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  title:string = 'myTitle';

  constructor() { 

  }

  getTitle = ():string => this.title;
  setTitle = (_title:string) => this.title = _title;
}
