import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElencoRicettePage } from './elenco-ricette.page';

const routes: Routes = [
  {
    path: '',
    component: ElencoRicettePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElencoRicettePageRoutingModule {}
