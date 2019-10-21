import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: './modules/tasks/home.module#HomeModule', canActivate:[AuthGuard]},
  {path: 'account', loadChildren: './modules/account/account.module#AccountModule'},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
