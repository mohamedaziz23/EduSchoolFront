import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierExamenComponent } from './calendrier-examen.component';

describe('CalendrierExamenComponent', () => {
  let component: CalendrierExamenComponent;
  let fixture: ComponentFixture<CalendrierExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierExamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
