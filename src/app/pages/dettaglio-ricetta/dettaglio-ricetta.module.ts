import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DettaglioRicettaPageRoutingModule } from './dettaglio-ricetta-routing.module';

import { DettaglioRicettaPage } from './dettaglio-ricetta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DettaglioRicettaPageRoutingModule
  ],
  declarations: [DettaglioRicettaPage]
})
export class DettaglioRicettaPageModule {}
