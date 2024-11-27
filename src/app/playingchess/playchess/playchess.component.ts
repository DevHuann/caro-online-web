import {Component, Inject, InjectionToken, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, count, Subscription} from "rxjs";
import {BoardTransaction} from "../models/BoardTransaction";
import {PickChess} from "../models/PickChess";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ChessService} from "../services/chess.service";
import {PickChessResponse} from "../models/PickChessResponse";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../room/models/User";
import {LoginService} from "../../login/components/services/login.service";
import {MainService} from "../../room/service/main.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {WebSocketService} from "../services/WebSocketService";
export const WEBSOCKET_SERVICE_TOKEN = new InjectionToken<WebSocketService>('WEBSOCKET_SERVICE_TOKEN');
@Component({
  selector: 'app-playchess',
  templateUrl: './playchess.component.html',
  styleUrls: ['./playchess.component.scss']
})
export class PlaychessComponent implements OnInit, OnDestroy {
  user: User = {
    id: '',
    username: '',
  };

  resetForm!: FormGroup;
  size = 5;
  boardTransactionId: number = 0;
  turnType = 0;
  isWin = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  boardQueueSubcription: Subscription | undefined;
  private boardUpdateSubscription: Subscription | undefined;
  constructor(
    private chessService: ChessService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private mainService: MainService,
    private matDialog: MatDialog,
    @Inject(WEBSOCKET_SERVICE_TOKEN) private webSocketService: WebSocketService
  ) {
  }

  ngOnDestroy(): void {
    this.boardQueueSubcription?.unsubscribe();
  }

  ngOnInit(): void {
    const tokenObj = this.loginService.token();
    const userId = tokenObj['sub'];
    this.mainService.getUserById(userId).subscribe(res => {
      this.user = res;
    })
    this.boardQueueSubcription = this.chessService.boardQueue.subscribe(boardId => {
      if (boardId != 0) {
        this.boardTransactionId = boardId;
        this.getBoardTransaction();
      }
    })
    // this.subscribeToBoardUpdates();
    this.resetForm = this.formBuilder.group({
      boardTransactionId: '',
      type: '',
      x: '',
      y: ''
    })
  }

  // subscribeToBoardUpdates() {
  //   this.boardUpdateSubscription = this.webSocketService.listen('board-update').subscribe(
  //     (response: BoardTransaction) => {
  //       console.log('Received board update:', response);
  //       // Cập nhật giao diện người dùng với thông tin mới nhận được từ máy chủ
  //       this.chessBoard = this.convertStringTo2DArray(response?.board);
  //       this.turnType = response.turnType;
  //       this.isWin = response.isWin;
  //       if (this.isWin) {
  //         this.openDialog(this.boardTransactionId);
  //       }
  //     },
  //     (error) => {
  //       console.error('WebSocket error:', error);
  //     }
  //   );
  // }

  reset() {
    const reset = this.resetForm.value;
    this.chessService.resetBoard(this.boardTransactionId, -1, 0, 0)
      .subscribe(
        res => {
          this.router.navigate(["/room"])
        }
      )
  }

  chessBoard: any[] = [];

  private getBoardTransaction() {
    this.chessService.getBoardTransactionById(this.boardTransactionId).subscribe((res: BoardTransaction) => {
      console.log(res);
      this.chessBoard = this.convertStringTo2DArray(res?.board);
    })
  }

  tmp = '';

  pic(x: number, y: number) {
    if (this.isWin) {
      // this.openSnackBar();
      return;
    }
    const pickChess = new PickChess();
    pickChess.x = x;
    pickChess.y = y;
    pickChess.type = this.turnType;
    pickChess.boardTransactionId = this.boardTransactionId;
    pickChess.mode = 'BLOCK';


    this.chessService.pickChess(pickChess).subscribe((res: PickChessResponse) => {
      this.getBoardTransaction();
      this.turnType = this.turnType == 0 ? 1 : 0;
      this.isWin = res.win;
      if (this.isWin) {
        this.openDialog(this.boardTransactionId)
      }
    })
  }


  convertStringTo2DArray(boardString: string) {
    const arr = boardString.split(',');
    const arrSize = Math.sqrt(arr.length);

    const result: any[] = [];
    let x = 0, y = 0;
    let tmpArr: any[] = [];
    for (let i = 0; i < arr.length; i++) {
      tmpArr = tmpArr.concat(arr[i]);
      y++;
      if (y == arrSize) {
        y = 0;
        x++;
        result.push(tmpArr);
        let newArr: any[] = [];
        tmpArr = newArr;
      }
    }
    console.log(result)
    return result;
  }

  openDialog(boardId: number): void {
    this.matDialog.open(DialogComponent, {
      height: '200px',
      width: '400px',
    });
  }
  /*IsWin(x: number, y: number) {
    return this.Iswinhang(x, y) || this.Iswincot(x, y) || this.IsWinCheochinh(x, y) || this.ISWincheophu(x, y);
  }*/

  /*Iswinhang(x: number, y: number) {
    let countLeft = 0;
    let countRight = 0;
    for (let i = y; i >= 0; i--) {
      if (this.chessBoard[x][i] === this.chessBoard[x][y]) {
        countLeft = countLeft + 1;
      }
    }
    for (let i = y + 1; i <= this.chessBoard[x].length; i++) {
      if (this.chessBoard[x][i] === this.chessBoard[x][y]) {
        countRight = countRight + 1;
      }
    }
    return countRight + countLeft === 5;
  }

  Iswincot(x: number, y: number) {
    let counttop = 0;
    let countbot = 0;
    for (let i = x; i >= 0; i--) {
      if (this.chessBoard[i][y] === this.chessBoard[x][y]) {
        counttop = counttop + 1;
      } else {
        break
      }
    }
    for (let i = x + 1; i <= this.chessBoard.length; i++) {
      if (this.chessBoard[i][y] === this.chessBoard[x][y]) {
        countbot = countbot + 1;
      } else {
        break
      }
    }
    return countbot + counttop == 5;
  }

  IsWinCheochinh(x: number, y: number) {
    let counttop = 0;
    let countbot = 0;
    for (let i = 0; i <= x; i++) {

      if (this.chessBoard[x - i][y - i] === this.chessBoard[x][y]) {
        counttop = counttop + 1;
      } else {
        break
      }
    }
    for (let i = 1; i <= (this.chessBoard.length - x); i++) {

      if (this.chessBoard[x + i][y + i] === this.chessBoard[x][y]) {
        countbot = countbot + 1;
      } else {
        break
      }
    }
    return countbot + counttop === 5;
  }

  ISWincheophu(x: number, y: number) {
    let counttop = 0;
    let countbot = 0;
    for (let i = 0; i <= x; i++) {
      if (this.chessBoard[x - i][y + i] === this.chessBoard[x][y]) {
        counttop = counttop + 1;
      } else {
        break;
      }
    }
    for (let i = 1; i <= this.chessBoard.length; i++) {
      if (this.chessBoard[x + i][y - i] === this.chessBoard[x][y]) {
        countbot = countbot + 1;
      } else {
        break;
      }
    }
    return countbot + counttop === 5;
  }*/
}
