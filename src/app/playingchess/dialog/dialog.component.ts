import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ChessService} from "../services/chess.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BoardTransaction} from "../models/BoardTransaction";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  boardTransactionId:number = 0;
  boardQueueSubcription:Subscription|undefined;
  resetForm!:FormGroup;
  constructor(
    private chessService:ChessService,
    private formBuilder:FormBuilder,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.boardQueueSubcription=this.chessService.boardQueue.subscribe(boardId=>{
      if(boardId !=0){
        this.boardTransactionId=boardId;
        // this.getBoardTransaction();
      }
    })
    this.resetForm=this.formBuilder.group({
      boardTransactionId:'',
      type:'',
      x:'',
      y:''
    })
  }

  playAgain(){
    const reset=this.resetForm.value;
    this.chessService.resetBoard(this.boardTransactionId,-1,0,0)
      .subscribe(
        res=>{
        }
      )
    setTimeout(()=>this.getBoardTransactionByBoardId(),1000)

  }
  out(){
    const reset=this.resetForm.value;
    this.chessService.resetBoard(this.boardTransactionId,-1,0,0)
      .subscribe(
        res=>{
          this.router.navigate(['/room'])
        }
      )
  }
  getBoardTransactionByBoardId() {
      this.router.navigate(["/loader"]);
    this.chessService.boardQueue.next(this.boardTransactionId);
    setTimeout(()=>
      this.router.navigate(['/room/chess-room']),1000
    );





  }

}
