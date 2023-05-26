import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventaryPage } from './inventary.page';

const routes: Routes = [
  {
    path: '',
    component: InventaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventaryPageRoutingModule {}
