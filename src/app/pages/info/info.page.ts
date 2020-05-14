import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage extends BaseComponent implements OnInit {

  constructor(public alertCtrl: AlertController) { 
    super(alertCtrl);
    this.pageName = 'Info';
  }

  ngOnInit() {
  }

}
