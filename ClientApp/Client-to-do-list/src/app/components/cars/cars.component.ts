import { Component } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  
  addCarSatatus ="";

  constructor(){
  }

  AddCar(){
    this.addCarSatatus = "Car is added!";
  }

  InputChange(value){
    this.addCarSatatus = value;
  }
}