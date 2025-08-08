import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendsChatPageRoutingModule } from './friends-chat-routing.module';

import { FriendsChatPage } from './friends-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendsChatPageRoutingModule
  ],
  declarations: [FriendsChatPage]
})
export class FriendsChatPageModule {}
