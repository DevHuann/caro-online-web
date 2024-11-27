import {Component, OnInit} from '@angular/core';
import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup} from "@angular/forms";
import {ChatService} from "../service/chat.service";
import {ChatModel} from "../models/chat-model";

@Component({
  selector: 'app-room-chat-dotnet',
  templateUrl: './room-chat-dotnet.component.html',
  styleUrls: ['./room-chat-dotnet.component.scss']
})
export class RoomChatDotnetComponent implements OnInit {
  chatForm = new FormGroup({
    message: new FormControl('')
  })

  messages: ChatModel[] = [];

  // @ts-ignore
  private _hubConnection: HubConnection;

  constructor(
    private _chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.initChatSocket();
  }

  private initChatSocket() {
    // @ts-ignore
    const signalROptions = {
      transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling
    };


    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.signalr_domain}/notify`, signalROptions)
      .configureLogging(LogLevel.Debug)
      .build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('BroadcastNotification', (data: any) => {
      console.log(data);
      this.messages.push(data);
    });
  }

  submitChat() {
    const value = this.chatForm.value;
    console.log(value);
    this._chatService.chat(value).subscribe(res => {
      console.log();
    })
    this.chatForm.reset();
  }
}
