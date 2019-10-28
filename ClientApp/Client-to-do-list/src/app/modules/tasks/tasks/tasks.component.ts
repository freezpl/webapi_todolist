import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/Task';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks:Task[];
  constructor(private titleService: Title, 
              private tasksService:TasksService,
              private errorHandlerService: ErrorHandlerService
    ){
    
  }

  ngOnInit(){
    this.titleService.setTitle('Tasks');
    this.tasksService.GetTasks().subscribe((data:Task[]) => {
      this.tasks = data;
    },
    (data) => {
      this.errorHandlerService.loadDataError(data);
    }
    );
  }

}
