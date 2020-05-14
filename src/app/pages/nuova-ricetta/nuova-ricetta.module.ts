import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuovaRicettaPageRoutingModule } from './nuova-ricetta-routing.module';

import { NuovaRicettaPage } from './nuova-ricetta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuovaRicettaPageRoutingModule
  ],
  declarations: [NuovaRicettaPage]
})
export class NuovaRicettaPageModule {}
