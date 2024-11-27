import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "./models/User";
import {LoginService} from "../login/components/services/login.service";
import {MainService} from "./service/main.service";


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  user: User = {
    id: '',
    username: '',
  };

  constructor(
    private router: Router, private loginService: LoginService, private mainService: MainService
  ) {
  }

  ngOnInit(): void {
    const tokenObj=this.loginService.token();
    const userId = tokenObj['sub'];
    this.mainService.getUserById(userId).subscribe(res => {
      this.user = res;
    })
  }
  handleLogout() {
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }
}
