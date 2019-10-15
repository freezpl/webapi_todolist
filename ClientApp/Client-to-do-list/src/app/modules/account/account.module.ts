import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing/account-routing.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    AccountRoutingModule
  ]
})
export class AccountModule { 



}
