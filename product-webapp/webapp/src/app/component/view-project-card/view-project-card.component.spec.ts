import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectCardComponent } from './view-project-card.component';

describe('ViewProjectCardComponent', () => {
  let component: ViewProjectCardComponent;
  let fixture: ComponentFixture<ViewProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
