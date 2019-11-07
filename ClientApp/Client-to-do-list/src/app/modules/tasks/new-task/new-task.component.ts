import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category';
import { Task } from 'src/app/models/Task';
import { TasksService } from 'src/app/services/tasks.service';
import { Tag } from 'src/app/models/Tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @ViewChild('searchInput', { static: false }) inputEl: ElementRef;

  form: FormGroup;
  categories: Category[];
  default: string = 'One';

  task: Task;
  tagName: string;
  searchTags: Tag[];

  constructor(private tasksService: TasksService, private router: Router) {
    this.tagName = "";
    this.task = new Task();
    this.task.tags = [];
    this.searchTags = [];
  }

  ngOnInit() {

    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      category: new FormControl(null),
      priority: new FormControl('5', [Validators.min(0), Validators.max(10)]),
    });

    this.tasksService.GetCategories().subscribe((data: Category[]) => {
      this.categories = (data);
      this.form.controls['category'].setValue(this.categories[0].id);
    });

  }

  submit() {
  this.task.description = this.form.get('description').value;
    this.task.category = this.categories.find(c => {
      return c.id == this.form.get('category').value;
    }); 
    this.task.priority = this.form.get('priority').value;
    console.log(this.task);
    this.tasksService.AddTask(this.task).subscribe((isAdded:boolean)=>{
      console.log(isAdded);
      this.router.navigateByUrl('/tasks');
    }, (err)=> {
      console.error(err);
    });
  }

  input(): void {

    if (this.tagName.trim() == "") {
      this.searchTags = [];
      return;
    }

    this.inputEl.nativeElement.disabled = true;
    this.tasksService.GetTags(this.tagName).subscribe((tags: Tag[]) => {
      this.searchTags = tags;
    }, (err) => { }, () => {
      this.inputEl.nativeElement.disabled = false;
      this.inputEl.nativeElement.focus();
    });
  }

  addTag(event) {
    if (!this.IsCanAddTag(this.searchTags[event.target.id].name))
      return;
    this.task.tags.push(this.searchTags[event.target.id]);
  }

  addNewTag() {
    if (this.tagName.trim() == "")
      return;
    if (!this.IsCanAddTag(this.tagName))
      return;
    this.task.tags.push({ id: undefined, name: this.tagName, color: this.GenerateColor() });
  }

  private IsCanAddTag(tagName: string): boolean {
    let findCopy: Tag = this.task.tags.find(t => {
      return t.name == tagName
    });
    return (findCopy == undefined) ? true : false;
  }

  private GenerateColor():string{
    let symbols = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
    let res:string = '#';
    for (let i = 0; i < 6; i++) 
      res+=symbols[Math.floor(Math.random()*16)];
    return  res;
  }


  removeTag() {

  }

}