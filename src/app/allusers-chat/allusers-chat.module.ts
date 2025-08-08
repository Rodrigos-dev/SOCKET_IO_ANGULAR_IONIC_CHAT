import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllusersChatPageRoutingModule } from './allusers-chat-routing.module';

import { AllusersChatPage } from './allusers-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllusersChatPageRoutingModule
  ],
  declarations: [AllusersChatPage]
})
export class AllusersChatPageModule {}
