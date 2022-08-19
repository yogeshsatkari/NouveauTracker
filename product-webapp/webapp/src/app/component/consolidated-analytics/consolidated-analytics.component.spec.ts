import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedAnalyticsComponent } from './consolidated-analytics.component';

describe('ConsolidatedAnalyticsComponent', () => {
  let component: ConsolidatedAnalyticsComponent;
  let fixture: ComponentFixture<ConsolidatedAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
