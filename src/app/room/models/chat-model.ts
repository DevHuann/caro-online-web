export class ChatModel {
  timestamp: string;
  from: string;
  message: string;


  constructor(timestamp: string, from: string, message: string) {
    this.timestamp = timestamp;
    this.from = from;
    this.message = message;
  }
}
