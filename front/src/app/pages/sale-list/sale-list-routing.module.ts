import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleListPage } from './sale-list.page';

const routes: Routes = [
  {
    path: '',
    component: SaleListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleListPageRoutingModule {}
