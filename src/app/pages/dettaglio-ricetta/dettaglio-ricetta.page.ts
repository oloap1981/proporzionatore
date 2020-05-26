import { Component, OnInit } from '@angular/core';
import { Ricetta } from 'src/app/models/ricetta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettaglio-ricetta',
  templateUrl: './dettaglio-ricetta.page.html',
  styleUrls: ['./dettaglio-ricetta.page.scss'],
})
export class DettaglioRicettaPage implements OnInit {

  public ricetta: Ricetta;

  constructor(
    private route: ActivatedRoute
  ) { 
    this.ricetta = new Ricetta();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ricetta = JSON.parse(params['ricetta']) as Ricetta;
      console.log(JSON.stringify(this.ricetta));
    });
  }

}
