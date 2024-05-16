import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantClasseComponent } from './enseignant-classe.component';

describe('EnseignantClasseComponent', () => {
  let component: EnseignantClasseComponent;
  let fixture: ComponentFixture<EnseignantClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantClasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
