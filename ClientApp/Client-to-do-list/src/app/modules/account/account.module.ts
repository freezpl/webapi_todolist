import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing/account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, AccountComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
  
  constructor() {

  }
}
