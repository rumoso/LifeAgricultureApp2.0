import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleShowPage } from './sale-show.page';

const routes: Routes = [
  {
    path: '',
    component: SaleShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleShowPageRoutingModule {}
