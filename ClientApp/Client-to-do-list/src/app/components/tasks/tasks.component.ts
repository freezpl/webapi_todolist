import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:Task[];

  constructor(private titleService: Title, private httpService:HttpService){
    
  }

  ngOnInit(){
    this.titleService.setTitle('Tasks');
    this.httpService.GetTasks().subscribe((data:Task[]) => {
      this.tasks = data;
      console.log(this.tasks);
    });
  }

}
