import { Component, OnInit } from '@angular/core';
import {Room} from "../../playingchess/models/Room";
import {RoomService} from "../../playingchess/services/room.service";
import {BoardService} from "../../main-board/services/board.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.scss']
})
export class MainlayoutComponent implements OnInit {
  room:Room[]=[];
  constructor(
    private roomService: RoomService,
    private boardService:BoardService,
    private route:Router
  ) { }

  ngOnInit(): void {

    this.getlistroom()
  }
  private getlistroom(){
    this.roomService.getlistroom().subscribe((res:any)=>{
      this.room = res
    })
  }
  public getRoomTransactionByRoomId(roomInfo:Room){
    this.boardService.getRoomTransactionById(roomInfo?.id).subscribe((res:Room)=>{
      this.boardService.roomQueue.next(res?.id);
      this.route.navigate(['/room/room-board'])
    })
  }
}
