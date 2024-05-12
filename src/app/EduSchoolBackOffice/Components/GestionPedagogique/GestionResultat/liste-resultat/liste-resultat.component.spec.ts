import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeResultatComponent } from './liste-resultat.component';

describe('ListeResultatComponent', () => {
  let component: ListeResultatComponent;
  let fixture: ComponentFixture<ListeResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeResultatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
