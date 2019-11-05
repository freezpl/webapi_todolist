import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Task } from 'src/app/models/Task';
import { TasksService } from 'src/app/services/tasks.service';
import { Tag } from 'src/app/models/Tag';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  form: FormGroup;
  categories: Category[];
  default: string = 'One';

  task:Task;

  constructor(private tasksService:TasksService) {
    
  }

  ngOnInit(){
    this.task = new Task();
    this.task.tags = [{id:3, name:'asadasdas', color:"ff45aa" } ];
    
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      category: new FormControl(null),
    });

    this.tasksService.GetCategories().subscribe((data:Category[]) => {
      this.categories = (data);
      this.form.controls['category'].setValue(this.categories[0].id);
    });

  }

  submit(){
    console.log(this.form.value);
  }
}