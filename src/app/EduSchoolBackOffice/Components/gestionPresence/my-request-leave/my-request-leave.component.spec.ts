import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestLeaveComponent } from './my-request-leave.component';

describe('MyRequestLeaveComponent', () => {
  let component: MyRequestLeaveComponent;
  let fixture: ComponentFixture<MyRequestLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRequestLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRequestLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
