import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DettaglioRicettaPage } from './dettaglio-ricetta.page';

describe('DettaglioRicettaPage', () => {
  let component: DettaglioRicettaPage;
  let fixture: ComponentFixture<DettaglioRicettaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioRicettaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioRicettaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
