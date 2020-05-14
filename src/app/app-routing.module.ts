import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'principale',
    pathMatch: 'full'
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'principale',
    loadChildren: () => import('./pages/principale/principale.module').then( m => m.PrincipalePageModule)
  },
  {
    path: 'nuova-ricetta',
    loadChildren: () => import('./pages/nuova-ricetta/nuova-ricetta.module').then( m => m.NuovaRicettaPageModule)
  },
  {
    path: 'elenco-ricette',
    loadChildren: () => import('./pages/elenco-ricette/elenco-ricette.module').then( m => m.ElencoRicettePageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
