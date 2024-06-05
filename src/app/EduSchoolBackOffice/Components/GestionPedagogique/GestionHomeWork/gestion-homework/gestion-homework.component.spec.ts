import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHomeworkComponent } from './gestion-homework.component';

describe('GestionHomeworkComponent', () => {
  let component: GestionHomeworkComponent;
  let fixture: ComponentFixture<GestionHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionHomeworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
