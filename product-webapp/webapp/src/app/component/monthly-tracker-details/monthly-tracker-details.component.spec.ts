import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTrackerDetailsComponent } from './monthly-tracker-details.component';

describe('MonthlyTrackerDetailsComponent', () => {
  let component: MonthlyTrackerDetailsComponent;
  let fixture: ComponentFixture<MonthlyTrackerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyTrackerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyTrackerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
