import { Component, OnInit, Directive } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors, NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Promise } from 'q';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailAccessValidator } from 'src/app/validators/EmailAccessValidator';
import { UserRegister } from 'src/app/models/UserRegister';

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
      name: new FormControl('Pasha',  [Validators.required]),
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

  submit(){
    let user:UserRegister = {email: this.form.get('login').value, name : this.form.get('name').value, password : this.form.get('password').value }
    this.authService.register(user).subscribe(
      (data)=>{
        if(data){
          this.authService.login(user).subscribe((data:any)=>{
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("id", data.user_id);
            this.router.navigateByUrl("");
          });
        }
      }
      );
  }

  
    

}