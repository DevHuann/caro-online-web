import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomChatComponent} from "./room-chat/room-chat.component";
import {ChessRoomComponent} from "./chess-room/chess-room.component";
import {BoardComponent} from "./board/board.component";
import {ListRoomComponent} from "./list-room/list-room.component";
import {RoomComponent} from "./room.component";

const routes: Routes = [
  {path:'room',component:RoomComponent,children:[
      {path: '', component: ListRoomComponent},
      {path: 'list-room', component: ListRoomComponent},
      {path: 'room-chat', component: RoomChatComponent},
      {path: 'chess-room', component: ChessRoomComponent},
      {path:'room-board',component:BoardComponent},
    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule {
}
