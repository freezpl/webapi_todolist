import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  // {path: '', component: HomeComponent, 
  //              children:[{path: 'tasks', component: TasksComponent}]},
  {path: '', redirectTo: 'tasks/', pathMatch: 'full' },
  {path: '', component: HomeComponent, 
               children:[
                 {path: 'tasks/', component: TasksComponent},
                 {path: 'add-task/', component: TasksComponent},
              ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }



