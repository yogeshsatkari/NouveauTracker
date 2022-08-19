import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingTrackersComponent } from './missing-trackers.component';

describe('MissingTrackersComponent', () => {
  let component: MissingTrackersComponent;
  let fixture: ComponentFixture<MissingTrackersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingTrackersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingTrackersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
