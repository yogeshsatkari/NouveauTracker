/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MonthlyTrackerService } from './monthly-tracker.service';

describe('Service: MonthlyTracker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthlyTrackerService]
    });
  });

  it('should ...', inject([MonthlyTrackerService], (service: MonthlyTrackerService) => {
    expect(service).toBeTruthy();
  }));
});
