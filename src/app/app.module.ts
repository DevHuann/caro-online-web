import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from "./login/login.module";
import {RoomModule} from "./room/room.module";
import {MainlayoutModule} from "./mainlayout/mainlayout.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxPermissionsModule} from "ngx-permissions";
import {JwtModule} from "@auth0/angular-jwt";
import {InterceptorService} from "./core/interceptor.service";
import {LoaderModule} from "./loader/loader.module";
import {WebSocketService} from "./playingchess/services/WebSocketService";
import {WEBSOCKET_SERVICE_TOKEN} from "./playingchess/playchess/playchess.component";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };
@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MainlayoutModule,
        RoomModule,
        BrowserAnimationsModule,
        LoginModule,
      LoaderModule,
      NgxPermissionsModule.forRoot(),
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem("token");
          },
        },
      }),
      SocketIoModule.forRoot(config),
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
      { provide: WEBSOCKET_SERVICE_TOKEN, useClass: WebSocketService },],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
