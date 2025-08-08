import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatBoxPageRoutingModule } from './chat-box-routing.module';

import { ChatRoomPage } from './chat-box.page';
import { AmigosChatPageModule } from '../amigos-chat/amigos-chat.module';
import { AmigosChatPage } from '../amigos-chat/amigos-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChatBoxPageRoutingModule,
  ],
  declarations: [ChatRoomPage],

})
export class ChatBoxPageModule { }
