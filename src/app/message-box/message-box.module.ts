import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageBoxPageRoutingModule } from './message-box-routing.module';

import { MessageBoxPage } from './message-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageBoxPageRoutingModule
  ],
  declarations: [MessageBoxPage]
})
export class MessageBoxPageModule {}
