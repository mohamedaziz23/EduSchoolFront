import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GereRdvComponent } from './gere-rdv.component';

describe('GereRdvComponent', () => {
  let component: GereRdvComponent;
  let fixture: ComponentFixture<GereRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GereRdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GereRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
