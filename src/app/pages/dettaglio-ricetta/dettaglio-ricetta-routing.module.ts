import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DettaglioRicettaPage } from './dettaglio-ricetta.page';

const routes: Routes = [
  {
    path: '',
    component: DettaglioRicettaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DettaglioRicettaPageRoutingModule {}
