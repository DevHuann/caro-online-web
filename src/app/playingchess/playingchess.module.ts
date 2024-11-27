import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayingchessRoutingModule } from './playingchess-routing.module';
import {PlaychessComponent} from "./playchess/playchess.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MainChatModule} from "../main-chat/main-chat.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {WebSocketService} from "./services/WebSocketService";


@NgModule({
  declarations: [
    PlaychessComponent,
    DialogComponent
  ],
  exports: [
    PlaychessComponent,
  ],
  imports: [
    CommonModule,
    PlayingchessRoutingModule,
    MatSnackBarModule,
    MainChatModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,


  ]
})
export class PlayingchessModule { }
