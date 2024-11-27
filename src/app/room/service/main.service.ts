import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private httpClien:HttpClient) { }
getUserById(userId:number){
    return this.httpClien.get<User>(`${environment.api_domain}/api/GetUserById/${userId}`)
}
}
