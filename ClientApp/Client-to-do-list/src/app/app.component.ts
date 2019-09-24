import { Component, OnInit } from '@angular/core';
import { TitleService } from './services/title.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  constructor(private titleService: Title){
    
  }

  ngOnInit(){
    this.titleService.setTitle('Todo List');
  }

}
