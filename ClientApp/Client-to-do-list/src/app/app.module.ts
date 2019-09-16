import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MyComponent } from './components/my/my.component';
import { CarComponent } from './components/car/car.component';
import { CarsComponent } from './components/cars/cars.component';

@NgModule({
  declarations: [
    AppComponent,
    MyComponent,
    CarComponent,
    CarsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
