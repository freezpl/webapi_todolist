import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent{
  carName:string;
  carYear:number = 2011;

  addCarSatatus:boolean;

  @Output()
  AddCarEmitter = new EventEmitter<{name:string, year:number}>();

  AddNewCar(){
    this.addCarSatatus = true;
    this.AddCarEmitter.emit({name:this.carName, year:this.carYear});
  }
 
  InputChange(value){
    this.addCarSatatus = value;
  }
}
