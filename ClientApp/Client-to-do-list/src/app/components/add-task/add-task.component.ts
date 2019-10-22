import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  form: FormGroup;
  categories: Category[];

  task:Task;

  constructor(private tasksService:TasksService) {
    
  }

  ngOnInit(){
    this.tasksService.GetCategories().subscribe(data => {
      this.form = new FormGroup({
        description: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
      });
    });
  }

  submit(){
    console.log(this.form.value);
  }
}