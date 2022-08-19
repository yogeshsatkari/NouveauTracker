import { ComponentFixture, TestBed } from '@angular/core/testing';

import MonthlyTrackerComponent from './monthly-tracker.component';

describe('MonthlyTrackerComponent', () => {
  let component: MonthlyTrackerComponent;
  let fixture: ComponentFixture<MonthlyTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyTrackerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
