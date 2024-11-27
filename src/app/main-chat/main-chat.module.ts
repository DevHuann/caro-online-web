import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainChatRoutingModule } from './main-chat-routing.module';
import { MainChatComponent } from './main-chat/main-chat.component';
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        MainChatComponent
    ],
    exports: [
        MainChatComponent
    ],
  imports: [
    CommonModule,
    MainChatRoutingModule,
    FormsModule
  ]
})
export class MainChatModule { }
