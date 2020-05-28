import { Injectable } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Subject } from 'rxjs';
import { Ricetta } from '../models/ricetta';

@Injectable()
export class StoreService {

    constructor(private storage: Storage) { }

    private saveSubject: Subject<boolean> = new Subject<boolean>();
    public saveObservable = this.saveSubject.asObservable();

    private deleteSubject: Subject<boolean> = new Subject<boolean>();
    public deleteObservable = this.deleteSubject.asObservable();

    public clearUserData(): void {
        this.storage.clear();
    }

    public setData(ricetta: Ricetta): void {
        this.getListaRicettePromise().then((val) => {
            const listaRicette = val as Array<Ricetta>;
            listaRicette.push(ricetta);
            this.storage.set('ricette', listaRicette);
            this.saveSubject.next(true);
        });
    }

    public getListaRicettePromise() {
        return new Promise(resolve => { // store service prima inizializzaione
            this.storage.get('ricette').then((val: any) => { // recuperato dato dal database
                if (val != null) {
                    resolve(val);
                } else { // devo andare alla pagina del login
                    resolve(new Array<Ricetta>());
                }
            });
        });
    }

    public removeRicetta(ricetta: Ricetta) {
        this.getListaRicettePromise().then((val) => {
            const listaRicette = val as Array<Ricetta>;
            let index = 0;
            for (const ric of listaRicette) {
                if (ric.nomeRicetta === ricetta.nomeRicetta) {
                    break;
                }
                index++;
            }
            listaRicette.splice(index, 1);
            this.storage.set('ricette', listaRicette).then(() => {
                this.deleteSubject.next(true);
            });
        });
    }

}
