import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramCardComponent } from './view-program-card.component';

describe('ViewProgramCardComponent', () => {
  let component: ViewProgramCardComponent;
  let fixture: ComponentFixture<ViewProgramCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProgramCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgramCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
