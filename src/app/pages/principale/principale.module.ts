import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PrincipalePage } from './principale.page';

import { PrincipalePageRoutingModule } from './principale-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalePageRoutingModule
  ],
  declarations: [PrincipalePage]
})
export class PrincipalePageModule {}
