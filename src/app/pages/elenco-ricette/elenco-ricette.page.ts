import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { AlertController } from '@ionic/angular';
import { Ricetta } from 'src/app/models/ricetta';
import { takeUntil } from 'rxjs/operators';

import { StoreService } from 'src/app/services/store.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Ingrediente } from 'src/app/models/ingrediente';

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
    this.storeService.saveObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r) {
        this.presentAlert('Ricetta salvata correttamente');
        this.loadRicette();
      }
    });
    this.storeService.deleteObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if(r) {
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

  public async chiediRiproporzionaRicetta(ricetta: Ricetta) {
    let riferimento = this.getRiferimento(ricetta.listaIngredienti);

    let alert = await this.alertCtrl.create({
      header: 'Riproporziona',
      message: 'Con questa operazione puoi duplicare e riproporzionare la tua ricetta soltanto passando un nuovo valore di riferimento',
      inputs: [
        {
          name: 'nome',
          placeholder: 'nome ricetta'
        },
        {
          name: 'riferimento',
          value: riferimento.nome,
          disabled: true
        },
        {
          name: 'originale',
          value: riferimento.quantitaProporzionata,
          disabled: true
        },
        {
          name: 'proporzionata',
          placeholder: 'qtà proporzionata'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            const ricettaDaSalvare = this.getRicettaProporzionata(ricetta, data.originale, data.proporzionata, data.nome);
            this.salvaRicetta(ricettaDaSalvare);
          }
        }
      ]
    });
    await alert.present();
  }
  
  private salvaRicetta(ricetta: Ricetta) {
    this.storeService.setData(ricetta);
  }

  private getRicettaProporzionata(ricetta: Ricetta, quantitaOriginale: number, quantitaProporzionata: number, nome: string): Ricetta {
    const listaIngredienti = ricetta.listaIngredienti;

    let newListaIngredienti = new Array<Ingrediente>();
    var coefficienteProporzione = quantitaProporzionata / quantitaOriginale;

    for (let ingrediente of listaIngredienti) {

      var nuovoIngrediente = new Ingrediente();

      nuovoIngrediente.nome = ingrediente.nome;
      nuovoIngrediente.um = ingrediente.um;
      nuovoIngrediente.riferimento = ingrediente.riferimento

      if (ingrediente.riferimento) {
        nuovoIngrediente.quantitaOriginale = quantitaOriginale;
        nuovoIngrediente.quantitaProporzionata = quantitaProporzionata;
      } else {
        nuovoIngrediente.quantitaOriginale = ingrediente.quantitaProporzionata;
        nuovoIngrediente.quantitaProporzionata = ingrediente.quantitaProporzionata * coefficienteProporzione;
      }

      newListaIngredienti.push(nuovoIngrediente);
    }

    ricetta.listaIngredienti = newListaIngredienti;
    ricetta.nomeRicetta = nome;
    
    return ricetta;
  }

  private getRiferimento(ingredienti: Array<Ingrediente>): Ingrediente {
    
    for (let ingrediente of ingredienti) {
      if (ingrediente.riferimento) {
        return ingrediente;    
      }
    }
    return null;
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
