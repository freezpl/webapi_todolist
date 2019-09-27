import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  form: FormGroup;
  categories: Category[];

  task:Task;

  constructor(private httpService:HttpService) {
    
  }

  ngOnInit(){
    this.httpService.GetCategories().subscribe(data => {
      console.log(data);

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