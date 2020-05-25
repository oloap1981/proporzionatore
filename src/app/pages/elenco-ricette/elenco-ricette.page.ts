import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { AlertController } from '@ionic/angular';
import { Ricetta } from 'src/app/models/ricetta';
import { takeUntil } from 'rxjs/operators';

import { StoreService } from 'src/app/services/store.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elenco-ricette',
  templateUrl: './elenco-ricette.page.html',
  styleUrls: ['./elenco-ricette.page.scss'],
})
export class ElencoRicettePage extends BaseComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  public listaRicette: Array<Ricetta>;

  constructor(public alertCtrl: AlertController,
    public storeService: StoreService,
    public router: Router) { 

    super(alertCtrl);
    this.pageName = 'Elenco Ricette';
    this.listaRicette = new Array<Ricetta>();
  }

  ionViewDidEnter() {
    this.loadRicette();
    this.storeService.deleteObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if(r) {
        this.presentAlert('ricetta cancellata correttamente');
        this.loadRicette();
      }
    });
  }

  ngOnInit() {
  }

  public loadRicette() {
    this.storeService.getListaRicettePromise().then((val) => {
      this.listaRicette = val as Array<Ricetta>;
    });
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
            this.storeService.removeRicetta(ricetta);
          }
        }
      ]
    });
    await alert.present();
  }

  public selezionaRicetta(ricetta: Ricetta) {
    this.router.navigate(['/dettaglio-ricetta'], { queryParams: { ricetta: JSON.stringify(ricetta) } });
  }

  ngOnDestroy() {
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
