import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { NewTaskComponent } from './new-task/new-task.component';

const routes: Routes = [
  // {path: '', component: HomeComponent, 
  //              children:[{path: 'tasks', component: TasksComponent}]},
  {path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {path: '', component: HomeComponent, 
               children:[
                 {path: 'tasks', component: TasksComponent},
                 {path: 'new-task', component: NewTaskComponent},
              ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }



