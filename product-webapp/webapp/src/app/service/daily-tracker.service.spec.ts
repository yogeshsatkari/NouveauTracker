import { TestBed } from '@angular/core/testing';

import { DailyTrackerService } from './daily-tracker.service';

describe('DailyTrackerService', () => {
  let service: DailyTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
