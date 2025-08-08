import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatsThatIamJoin } from './services/api.service';
import { UserService } from './services/user.service';
import { ChatService } from './services/chat.service';
import { ChatsThatIAmJoinService } from './services/ChatsThatIAmJoin.service';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { ObservableTest } from './services/observableTest.service';
import { MessageService } from './services/message.service';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(environment.socketIoConfig)],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule,
    ChatsThatIamJoin,
    UserService,
    ChatService,
    ChatsThatIAmJoinService,
    MessageService,
    SocketService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
