import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Ingrediente } from 'src/app/models/ingrediente';
import { AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { Ricetta } from 'src/app/models/ricetta';
import { StoreService } from 'src/app/services/store.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nuova-ricetta',
  templateUrl: './nuova-ricetta.page.html',
  styleUrls: ['./nuova-ricetta.page.scss'],
})
export class NuovaRicettaPage extends BaseComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  public coefficienteProporzione: number;

  public nomeIngrediente: string;
  public quantitaOriginale: number;
  public quantitaProporzionata: number;

  public listaIngredienti: Array<Ingrediente>;

  public ricetta: Ricetta;

  constructor(
    public alertCtrl: AlertController,
    public storeService: StoreService) {

    super(alertCtrl);
    this.pulisciForm();
    this.pageName = 'Nuova Ricetta';
    this.coefficienteProporzione = 0;
    this.listaIngredienti = new Array<Ingrediente>();
    this.ricetta = new Ricetta();
  }

  ionViewDidEnter() {
    this.storeService.saveObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r) {
        this.presentAlert('Ricetta salvata correttamente');
        this.pulisciPagina();
      }
    });
  }

  ngOnInit() {

  }

  public pulisciForm() {
    this.nomeIngrediente = '';
    this.quantitaOriginale = 0;
    this.quantitaProporzionata = 0;
  }

  public pulisciPagina() {
    this.listaIngredienti = new Array<Ingrediente>();
    this.coefficienteProporzione = 0;
  }

  public digitaOriginale(event) {
    console.log(event);
    if (this.coefficienteProporzione > 0) {
      const quantitaProporzionataTemp = this.quantitaOriginale * this.coefficienteProporzione; // (Math.round(num * 100) / 100).toFixed(2)
      this.quantitaProporzionata = parseFloat((Math.round(quantitaProporzionataTemp * 100) / 100).toFixed(1));
    }
  }

  public aggiungiIngrediente() {

    if (this.listaIngredienti.length === 0) {
      this.coefficienteProporzione = this.quantitaProporzionata / this.quantitaOriginale;
    }

    const ingrediente = new Ingrediente();
    ingrediente.nome = this.nomeIngrediente;
    ingrediente.quantitaOriginale = this.quantitaOriginale;
    ingrediente.quantitaProporzionata = this.quantitaProporzionata;

    this.listaIngredienti.push(ingrediente);

    this.pulisciForm();
  }

  public salvaRicetta() {
    this.ricetta.listaIngredienti = this.listaIngredienti;
    this.storeService.setData(this.ricetta);
  }

  public async chiediSalvataggio() {
    const alert = await this.alertCtrl.create({
      header: 'Salvataggio',
      inputs: [
        {
          name: 'nome',
          placeholder: 'nome'
        },
        {
          name: 'note',
          placeholder: 'note'
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
            this.ricetta.nomeRicetta = data.nome;
            this.ricetta.noteRicetta = data.note;
            this.salvaRicetta();
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnDestroy() {
  }

  ionViewDidLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
