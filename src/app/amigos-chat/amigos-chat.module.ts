import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmigosChatPageRoutingModule } from './amigos-chat-routing.module';

import { AmigosChatPage } from './amigos-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmigosChatPageRoutingModule
  ],
  declarations: [AmigosChatPage]
})
export class AmigosChatPageModule { }
