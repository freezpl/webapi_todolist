import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { HomeRoutingModule } from './home-routing.module';
import { NewTaskComponent } from './new-task/new-task.component';

@NgModule({
  declarations: [
    HomeComponent, 
    TasksComponent, NewTaskComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
