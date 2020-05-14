import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base/base.component';
import { Ingrediente } from 'src/app/models/ingrediente';
import { AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { Ricetta } from 'src/app/models/ricetta';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nuova-ricetta',
  templateUrl: './nuova-ricetta.page.html',
  styleUrls: ['./nuova-ricetta.page.scss'],
})
export class NuovaRicettaPage extends BaseComponent implements OnInit {

  public coefficienteProporzione: number;

  public nomeIngrediente: string;
  public quantitaOriginale: number;
  public quantitaProporzionata: number;

  public listaIngredienti: Array<Ingrediente>;

  public ricetta: Ricetta;

  constructor(public alertCtrl: AlertController,
    public storeService: StoreService) { 

    super(alertCtrl);
    this.pulisciForm();
    this.pageName = 'Nuova Ricetta';
    this.coefficienteProporzione = 0;
    this.listaIngredienti = new Array<Ingrediente>();
    this.ricetta = new Ricetta();
  }

  ngOnInit() {
    this.storeService.saveObservable.subscribe(r => {
      if (r) {
        this.presentAlert('Ricetta salvata correttamente');
        this.pulisciPagina();
      }
    });
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
      this.quantitaProporzionata = this.quantitaOriginale * this.coefficienteProporzione;
    }
  }

  public aggiungiIngrediente() {

    if(this.listaIngredienti.length === 0){
      this.coefficienteProporzione = this.quantitaProporzionata / this.quantitaOriginale;
    }

    var ingrediente = new Ingrediente();
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
    let alert = await this.alertCtrl.create({
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

}
