import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllusersChatPage } from './allusers-chat.page';

const routes: Routes = [
  {
    path: '',
    component: AllusersChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllusersChatPageRoutingModule {}
