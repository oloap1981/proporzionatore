import { Component, OnInit } from '@angular/core';
import { Ricetta } from 'src/app/models/ricetta';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

  public pageName = '';

  constructor(public alertCtrl: AlertController) {}

  ngOnInit() {}

  public async presentAlert(messageToShow: string) {
    let alert = await this.alertCtrl.create({
      header: 'Conferma',
      message: messageToShow,
      buttons: ['OK']
    });
    await alert.present();
  }
/*

  public getListaRicette(): Array<Ricetta> {
    var ricetteString = this.storage.get('ricette');
    if (ricetteString === undefined || ricetteString === null || ricetteString === '') {
      return new Array<Ricetta>();
    } 
    var ricette = (JSON.parse(ricetteString)) as Array<Ricetta>;
    return ricette;
  }

  public addRicettaToStorage(ricetta: Ricetta) {
    var listaRicette = this.getListaRicette();
    listaRicette.push(ricetta);
    this.storage.setItem('ricette', JSON.stringify(listaRicette));
  }

  public cancellaRicetta(ricetta: Ricetta): void {
    // chiedere conferma
    var listaRicette = this.getListaRicette();
    var index = listaRicette.indexOf(ricetta);
    listaRicette.splice(index, 1);
    this.storage.setItem('ricette', JSON.stringify(listaRicette));
  }

  public async chiediCancellazioneRicetta(ricetta: Ricetta) {
    let alert = await this.alertCtrl.create({
      header: 'Conferma Cancellazione',
      message: 'Sicuro di voler cancellare la ricetta ' + ricetta.nomeRicetta + ' ?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'SI',
          handler: () => {
            this.cancellaRicetta(ricetta);
          }
        }
      ]
    });
    await alert.present();
  }
*/
}
