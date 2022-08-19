import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramMembersComponent } from './add-program-members.component';

describe('AddProgramMembersComponent', () => {
  let component: AddProgramMembersComponent;
  let fixture: ComponentFixture<AddProgramMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
