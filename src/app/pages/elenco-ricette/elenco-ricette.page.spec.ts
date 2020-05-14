import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElencoRicettePage } from './elenco-ricette.page';

describe('ElencoRicettePage', () => {
  let component: ElencoRicettePage;
  let fixture: ComponentFixture<ElencoRicettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoRicettePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElencoRicettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
