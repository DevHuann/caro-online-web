import { Injectable } from '@angular/core';
import {BoardTransaction} from "../models/BoardTransaction";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ResetBoard} from "../models/resetBoard";

@Injectable({
  providedIn: 'root'
})
export class ResetBoardService {

  constructor(private httpClient: HttpClient) { }

}
