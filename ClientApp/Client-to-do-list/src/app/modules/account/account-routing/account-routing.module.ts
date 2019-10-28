import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component'
import { RegisterComponent } from '../register/register.component';
import { AccountComponent } from '../account/account.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: '', component: AccountComponent, children: [
                {path: 'login', component: LoginComponent},
                {path: 'register', component: RegisterComponent},
            ]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }


