import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChart2Component } from './doughnut-chart2.component';

describe('DoughnutChart2Component', () => {
  let component: DoughnutChart2Component;
  let fixture: ComponentFixture<DoughnutChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutChart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
