import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuovaRicettaPage } from './nuova-ricetta.page';

describe('NuovaRicettaPage', () => {
  let component: NuovaRicettaPage;
  let fixture: ComponentFixture<NuovaRicettaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovaRicettaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuovaRicettaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
