import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'principale.page.html',
  styleUrls: ['principale.page.scss'],
})
export class PrincipalePage extends BaseComponent{

  constructor(public alertCtrl: AlertController) { 
    super(alertCtrl);
    this.pageName = 'Proporzione!';
  }

  ngOnInit() {

  }

}
