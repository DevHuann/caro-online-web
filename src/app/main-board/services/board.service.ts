import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {Room} from "../../playingchess/models/Room";
import {BoardTransaction} from "../../playingchess/models/BoardTransaction";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

    roomQueue=new BehaviorSubject(0);
  constructor(private httpClient:HttpClient) { }

  getListBoardByRoomId(roomid:number):Observable<BoardTransaction[]>{
    return this.httpClient.get<BoardTransaction[]>(`${environment.api_domain}/Board/get-list-board-by-roomId/${roomid}`)
  }
  getRoomTransactionById(id:number){
    return this.httpClient.get<Room>(`${environment.api_domain}/room/get-room-by-id/${id}`)
  }
  getBoardTransactionById(id: number) {
    return this.httpClient.get<BoardTransaction>(`${environment.api_domain}/Board/get-by-id/${id}`);
  }

}
