import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin } from 'src/app/models/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: UserLogin;

  constructor(private tasksService:AuthService) { 
    this.form = new FormGroup({
      login: new FormControl('a@a.ua', [Validators.required, Validators.email]),
      password: new FormControl('123Qweasd!', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit() {
  }

  submit(){
    let user:UserLogin = {email: this.form.get('login').value, password: this.form.get('password').value};
   
    this.tasksService.Login(user).subscribe((data:any)=>{
      console.log(data);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("id", data.user_id);
    });
  }

}
