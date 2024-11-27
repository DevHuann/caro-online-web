import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../room/models/User";
import {Router} from "@angular/router";
import {LoginService} from "../../login/components/services/login.service";
import {MainService} from "../../room/service/main.service";
import * as SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {ChessService} from "../../playingchess/services/chess.service";

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent implements OnInit {
  @ViewChild('scroll', { static: false }) scroll! : ElementRef;
  user: User = {
    id: '',
    username: '',
  };
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string = "";
  boardId: string = '';
  private stompClient: any = null;

  constructor(private router: Router, private loginService: LoginService, private mainService: MainService,private chessService: ChessService,){}
  ngOnInit() {
    this.connect();
    const tokenObj=this.loginService.token();
    const userId = tokenObj['sub'];
    this.mainService.getUserById(userId).subscribe(res => {
      this.user = res;
    })
    this.chessService.boardQueue.subscribe(boardId =>{
      if (boardId!=null){
        this.boardId=String(boardId);
      }
    })
    setInterval(()=> {
      this.scrollToBottom()
    },100)
  }
  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }
  connect() {
    const socket = new SockJS('http://localhost:8080/testchat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe(`/start/initial/${_this.boardId}`, function(hello: { body: any; }){
        console.log(JSON.parse(hello.body));
        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }
  sendMessage() {
    console.log(this.boardId)
    this.stompClient.send(
      `/current/resume/${this.boardId}`,
      {},
      JSON.stringify(this.user.username+' : '+this.newmessage)
    );
    this.newmessage = "";
  }
  showMessage(message: any) {
    this.greetings.push(message);
  }
  scrollToBottom(){
    this.scroll.nativeElement.scrollTop=this.scroll.nativeElement.scrollHeight;
  }

}
