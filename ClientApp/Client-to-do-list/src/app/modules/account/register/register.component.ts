import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;

  constructor(
    private authService: AuthService, 
      private route:ActivatedRoute,
      private router:Router) { 
    this.form = new FormGroup({
      login: new FormControl('a@a.ua', [Validators.required, Validators.email]),
      password: new FormControl('123Qweasd!', [Validators.required, Validators.minLength(3)]),
      passwordConfirm: new FormControl('123Qweasd!', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit() {
  }

}
