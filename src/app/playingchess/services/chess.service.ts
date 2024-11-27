import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BoardTransaction} from "../models/BoardTransaction";
import {PickChess} from "../models/PickChess";
import {PickChessResponse} from "../models/PickChessResponse";
import {Gettransactionbyroomid} from "../models/Gettransactionbyroomid";
import {BehaviorSubject} from "rxjs";
import {ResetBoard} from "../models/resetBoard";

@Injectable({
  providedIn: 'root'
})
export class ChessService {
  boardQueue = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) { }

  getBoardTransactionById(id: number) {
    return this.httpClient.get<BoardTransaction>(`${environment.api_domain}/Board/get-by-id/${id}`);
  }

  pickChess(pickChess: PickChess) {
    return this.httpClient.post<PickChessResponse>(`${environment.api_domain}/Board/pick-chess`, pickChess);
  }
  getTransactionByRoomId(roomid: number){
    return this.httpClient.post<BoardTransaction>(`${environment.api_domain}/Board/get-transaction-by-room-id`,new Gettransactionbyroomid(roomid,15) )
  }
  resetBoard(boardTransactionId:number,type:number,x:number,y:number) {
    return this.httpClient.post<BoardTransaction>(`${environment.api_domain}/chess/reset`,{boardTransactionId,type,x,y});
  }

}
