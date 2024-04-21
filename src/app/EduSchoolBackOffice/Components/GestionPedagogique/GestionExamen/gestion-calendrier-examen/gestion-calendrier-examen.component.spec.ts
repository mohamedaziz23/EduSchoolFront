import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCalendrierExamenComponent } from './gestion-calendrier-examen.component';

describe('GestionCalendrierExamenComponent', () => {
  let component: GestionCalendrierExamenComponent;
  let fixture: ComponentFixture<GestionCalendrierExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionCalendrierExamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCalendrierExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
