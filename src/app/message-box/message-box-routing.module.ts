import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageBoxPage } from './message-box.page';

const routes: Routes = [
  {
    path: '',
    component: MessageBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageBoxPageRoutingModule {}
