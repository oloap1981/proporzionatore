import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElencoRicettePageRoutingModule } from './elenco-ricette-routing.module';

import { ElencoRicettePage } from './elenco-ricette.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElencoRicettePageRoutingModule
  ],
  declarations: [ElencoRicettePage]
})
export class ElencoRicettePageModule {}
