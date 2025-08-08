import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScrollTestPage } from './scroll-test.page';

const routes: Routes = [
  {
    path: '',
    component: ScrollTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrollTestPageRoutingModule {}
