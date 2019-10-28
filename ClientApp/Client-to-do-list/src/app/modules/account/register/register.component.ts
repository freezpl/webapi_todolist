import { Component, OnInit, Directive } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Promise } from 'q';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailAccessValidator } from 'src/app/validators/EmailAccessValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [EmailAccessValidator]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private emailAccessValidator: EmailAccessValidator ) {
    this.form = new FormGroup({
      login: new FormControl('a@a.ua',  [Validators.email],  emailAccessValidator.checkEmail.bind(this.emailAccessValidator)),
      password: new FormControl('123Qweasd!', [Validators.required, Validators.minLength(3)]),
      passwordConfirm: new FormControl('123Qweasd!' ,[Validators.required]),
    }, { validators: [this.checkPasswords] }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirm').value;
    return (pass === confirmPass) ? null : { notSame: 'true' };
  }
  
  ngOnInit() {
  }

}