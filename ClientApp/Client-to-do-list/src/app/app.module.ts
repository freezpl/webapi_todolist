import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { AddTaskComponent } from './components/add-task/add-task.component';

import { AccountModule } from './modules/account/account.module'
import { HomeModule } from './modules/tasks/home.module'

@NgModule({
  declarations: [
    AppComponent,
    FormatDatePipe,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
