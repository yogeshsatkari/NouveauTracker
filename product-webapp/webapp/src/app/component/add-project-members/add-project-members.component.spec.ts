import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectMembersComponent } from './add-project-members.component';

describe('AddProjectMembersComponent', () => {
  let component: AddProjectMembersComponent;
  let fixture: ComponentFixture<AddProjectMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
