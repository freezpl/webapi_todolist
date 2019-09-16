import { Component} from '@angular/core';

@Component({
  selector: '[app-car]',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  carName = 'Ford';
  carYear = 2011;

  getName(){
    return this.carName;
  }
}
