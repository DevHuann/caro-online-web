import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {RoomService} from "../../../playingchess/services/room.service";
import {NgxPermissionsService} from "ngx-permissions";
import {LoginRequest} from "../models/loginRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  notiLogin: String = "";
  isSubmit=false;
  constructor(private loginService: LoginService,
              private route: Router,
              private formBuilder: FormBuilder,
              private roomService: RoomService,
              private permissionService:NgxPermissionsService
  ) {
  }

  dataForm = this.formBuilder.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  })
  ngOnInit(): void {
  }

  handleSubmit() {
    if(!this.dataForm.valid){
      this.isSubmit = true;
    }else {
      this.isSubmit = false;
      const data = this.dataForm.value as LoginRequest
      this.loginService.login(data).subscribe( (res:any) => {
        if(res != null){
          this.route.navigate(["/room"]);
          sessionStorage.setItem("token",res?.accessToken);
          const tokenObj = this.loginService.token();
          const claims = tokenObj[''];
          this.permissionService.loadPermissions(claims);
        }
      },error => {
        this.notiLogin="Sai thông tin đăng nhập!";
      })
    }
  }

}
