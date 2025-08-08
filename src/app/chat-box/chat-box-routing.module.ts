import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatRoomPage } from './chat-box.page';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatBoxPageRoutingModule { }
