import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../models/loginRequest";
import {SignupService} from "../services/signup.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  notiSignup:String="";
  signupForm!: FormGroup

  constructor(private signupService: SignupService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
        username:  '',
        password:  ''
      }
    )
  }


  signup(){
    const user = this.signupForm.value;
    if (user.username && user.password) {
      this.signupService.signup(user.username, user.password)
        .subscribe(
          res => {

            this.router.navigate(['login']);
            alert("Đăng ký thành công")
          },
          error => {
            this.notiSignup="Đăng ký không thành công!"

          }

        )
    }
  }

}
