// web-socket.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private socket: Socket) {

  }

  connectToWebSocket() {
    this.socket.connect();
  }

  disconnectFromWebSocket() {
    this.socket.disconnect();
  }

  sendChessMove(moveInfo: any) {
    this.socket.emit('chess-move', moveInfo); // Gửi thông tin về nước cờ đến server
  }

  receiveBoardUpdates() {
    return this.socket.fromEvent<any>('board-updates'); // Lắng nghe thông tin cập nhật từ server
  }

  listen(boardUpdate: string) {

  }
}
