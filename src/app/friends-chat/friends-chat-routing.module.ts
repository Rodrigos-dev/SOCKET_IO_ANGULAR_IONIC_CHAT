import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsChatPage } from './friends-chat.page';

const routes: Routes = [
  {
    path: '',
    component: FriendsChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsChatPageRoutingModule {}
