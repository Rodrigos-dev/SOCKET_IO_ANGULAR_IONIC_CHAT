import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScrollTestPageRoutingModule } from './scroll-test-routing.module';

import { ScrollTestPage } from './scroll-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollTestPageRoutingModule
  ],
  declarations: [ScrollTestPage]
})
export class ScrollTestPageModule {}
