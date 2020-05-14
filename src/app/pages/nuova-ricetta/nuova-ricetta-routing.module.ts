import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovaRicettaPage } from './nuova-ricetta.page';

const routes: Routes = [
  {
    path: '',
    component: NuovaRicettaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovaRicettaPageRoutingModule {}
