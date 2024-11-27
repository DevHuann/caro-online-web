import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { RoomChatComponent } from './room-chat/room-chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { ChessRoomComponent } from './chess-room/chess-room.component';
import {PlayingchessModule} from "../playingchess/playingchess.module";
import { BoardComponent } from './board/board.component';
import {MainBoardComponent} from "../main-board/main-board/main-board.component";
import { ListRoomComponent } from './list-room/list-room.component';
import {MainlayoutModule} from "../mainlayout/mainlayout.module";
import {MainChatModule} from "../main-chat/main-chat.module";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
    declarations: [
        RoomComponent,
        RoomChatComponent,
        ChessRoomComponent,
        BoardComponent,
        MainBoardComponent,
        ListRoomComponent
    ],
    exports: [
        RoomChatComponent
    ],
    imports: [
        CommonModule,
        RoomRoutingModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        PlayingchessModule,
        MainlayoutModule,
        MainChatModule,
        MatMenuModule,


    ]
})
export class RoomModule { }
