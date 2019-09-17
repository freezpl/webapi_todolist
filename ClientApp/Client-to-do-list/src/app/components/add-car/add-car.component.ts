import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent{
  carName:string;
  carYear:number = 2011;

  addCarSatatus:boolean;

  AddCar(){
    this.carName = '';
    this.carYear = 2000;
    this.addCarSatatus = true;
  }
 
  InputChange(value){
    this.addCarSatatus = value;
  }
}
