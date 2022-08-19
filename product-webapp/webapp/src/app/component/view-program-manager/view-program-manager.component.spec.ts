import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramManagerComponent } from './view-program-manager.component';

describe('ViewProgramManagerComponent', () => {
  let component: ViewProgramManagerComponent;
  let fixture: ComponentFixture<ViewProgramManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProgramManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgramManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
