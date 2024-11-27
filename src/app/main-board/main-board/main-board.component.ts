import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BoardTransaction} from "../../playingchess/models/BoardTransaction";
import {BoardService} from "../services/board.service";
import {ChessService} from "../../playingchess/services/chess.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit ,OnDestroy{
  board:BoardTransaction[]=[];
  roomTransactionId:number=2;
  roomQueueSubcription:Subscription|undefined;
  constructor(
    private boardService:BoardService,
    private chessService:ChessService,
    private router:Router,
  ) { }
  ngOnDestroy(): void {
    this.roomQueueSubcription?.unsubscribe();
  }
  ngOnInit(): void {

    this.roomQueueSubcription=this.boardService.roomQueue.subscribe(roomid=>{
      if(roomid!=0){
        this.roomTransactionId=roomid;
        this.getListBoard()
      }
    })

  }
  private getListBoard(){
    this.boardService.getListBoardByRoomId(this.roomTransactionId).subscribe((res:any)=>{
      this.board = res;
    })
  }

  getBoardTransactionByBoardId(boardInfo: BoardTransaction) {
    this.chessService.getBoardTransactionById(boardInfo?.id).subscribe((res:BoardTransaction)=>{
      this.chessService.boardQueue.next(res?.id);
      this.router.navigate(['/room/chess-room'])
    })
  }
}
