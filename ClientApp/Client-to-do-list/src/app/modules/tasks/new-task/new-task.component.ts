import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Task } from 'src/app/models/Task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  form: FormGroup;
  categories: Category[];

  task:Task;

  constructor(private tasksService:TasksService) {
    
  }

  ngOnInit(){
    this.tasksService.GetCategories().subscribe(data => {
      this.form = new FormGroup({
        description: new FormControl('', Validators.required),
      });
    });
  }

  submit(){
    console.log(this.form.value);
  }
}