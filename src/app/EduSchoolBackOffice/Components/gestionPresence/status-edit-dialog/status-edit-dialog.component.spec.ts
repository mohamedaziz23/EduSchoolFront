import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEditDialogComponent } from './status-edit-dialog.component';

describe('StatusEditDialogComponent', () => {
  let component: StatusEditDialogComponent;
  let fixture: ComponentFixture<StatusEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
