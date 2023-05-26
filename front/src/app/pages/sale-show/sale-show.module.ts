import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleShowPageRoutingModule } from './sale-show-routing.module';

import { SaleShowPage } from './sale-show.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleShowPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SaleShowPage]
})
export class SaleShowPageModule {}
