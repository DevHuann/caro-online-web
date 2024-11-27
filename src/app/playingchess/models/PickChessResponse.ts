import {BoardTransaction} from "./BoardTransaction";

export class PickChessResponse {
  boardTransaction!: BoardTransaction;
  win!: boolean;
}
