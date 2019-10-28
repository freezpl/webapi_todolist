import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EmailAccessValidator {

  constructor(private authService:AuthService) {
  }
        checkEmail(email: FormControl): Observable<any> {
        return this.authService.checkEmail(email.value).pipe(map(data => {
          return (data == true) ? {"busy": true} : null;
        }));
  }
}