import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquidationsPageRoutingModule } from './liquidations-routing.module';

import { LiquidationsPage } from './liquidations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiquidationsPageRoutingModule
  ],
  declarations: [LiquidationsPage]
})
export class LiquidationsPageModule {}
