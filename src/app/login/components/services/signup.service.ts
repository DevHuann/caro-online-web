import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../models/loginRequest";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  signup(username: string, password: string) {
    return  this.httpClient.post<LoginRequest>(`${environment.api_domain}/api/registration`,{username, password});
  }
}
