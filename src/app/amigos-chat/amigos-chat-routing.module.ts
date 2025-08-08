import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmigosChatPage } from './amigos-chat.page';

const routes: Routes = [
  {
    path: '',
    component: AmigosChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmigosChatPageRoutingModule {}
