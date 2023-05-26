import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventaryPageRoutingModule } from './inventary-routing.module';

import { InventaryPage } from './inventary.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventaryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InventaryPage]
})
export class InventaryPageModule {}
