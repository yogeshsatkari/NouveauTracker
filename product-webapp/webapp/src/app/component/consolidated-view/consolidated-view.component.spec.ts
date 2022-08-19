import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedViewComponent } from './consolidated-view.component';

describe('ConsolidatedViewComponent', () => {
  let component: ConsolidatedViewComponent;
  let fixture: ComponentFixture<ConsolidatedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
