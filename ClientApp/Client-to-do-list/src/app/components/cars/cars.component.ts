import { Component } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  
  cars:{name:string, year:number}[];

  addCarSatatus:boolean;

  constructor(){
    
    this.cars = [
    {name: 'Ford', year: 2011},
    {name: 'BMW', year: 2015},
    {name: 'Audi', year: 2012},
    ];
  }

  AddCar(car:{name:string, year:number}){
    this.cars.push(car);
  }
}