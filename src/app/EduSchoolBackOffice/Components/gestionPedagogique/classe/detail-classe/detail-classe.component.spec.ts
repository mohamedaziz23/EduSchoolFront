import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClasseComponent } from './detail-classe.component';

describe('DetailClasseComponent', () => {
  let component: DetailClasseComponent;
  let fixture: ComponentFixture<DetailClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailClasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
