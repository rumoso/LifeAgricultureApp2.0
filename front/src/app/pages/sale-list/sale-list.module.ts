import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleListPageRoutingModule } from './sale-list-routing.module';

import { SaleListPage } from './sale-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SaleListPage]
})
export class SaleListPageModule {}
