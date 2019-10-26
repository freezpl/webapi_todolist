import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin } from 'src/app/models/UserLogin';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: UserLogin;
  error: string;
  returnUrl: string;

  constructor(
      private authService: AuthService, 
      private route:ActivatedRoute,
      private router:Router) { 
    this.form = new FormGroup({
      login: new FormControl('a@a.ua', [Validators.required, Validators.email]),
      password: new FormControl('123Qweasd!', [Validators.required, Validators.minLength(3)]),
    });
  }



  ngOnInit() {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit(){
    
    let user:UserLogin = {email: this.form.get('login').value, password: this.form.get('password').value};
    this.authService.login(user).subscribe((data:any)=>{
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("id", data.user_id);
      this.error = '';
      this.router.navigateByUrl(this.returnUrl);
    },
    (error) => {
      this.error = 'Login or password is incorrect!';
    });
   }
}