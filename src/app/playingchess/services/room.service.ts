import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Room} from "../models/Room";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private username=new BehaviorSubject("username");
  currentUsername=this.username.asObservable();


  constructor(private httpClient: HttpClient) { }

  changeUsername(username:string){
    this.username.next(username)
  }
  getlistroom():Observable<Room[]>{
    return this.httpClient.get<Room[]>(`${environment.api_domain}/room/get-room-list`)
  }
}
