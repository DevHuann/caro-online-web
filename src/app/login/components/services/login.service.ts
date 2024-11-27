import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../models/loginRequest";
import {environment} from "../../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,   private jwtHelperService: JwtHelperService){ }
  login(loginRequest:LoginRequest) {
    return  this.httpClient.post(`${environment.api_domain}/api/login`,loginRequest)
  }
  public token = () => {
    const token = sessionStorage.getItem('token') ?? '';
    const objectToken = this.decodeToken(token);
    console.log(objectToken);
    return objectToken;
  }
  public decodeToken = (rawToken: string) => this.jwtHelperService?.decodeToken(rawToken);

}
