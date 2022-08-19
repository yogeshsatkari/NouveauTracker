import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgramService } from 'src/app/service/program.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-add-project-members',
  templateUrl: './add-project-members.component.html',
  styleUrls: ['./add-project-members.component.css'],
})

export class AddProjectMembersComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  memberCtrl = new FormControl('');
  filteredMembers: Observable<string[]>;
  members = new Set();
  allMembers = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public projectName: any,
    private programService: ProgramService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {
    this.filteredMembers = this.memberCtrl.valueChanges.pipe(
      startWith(null),
      map((member: string | null) => (member ? this._filter(member) : this.allMembers.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    const index = this.allMembers.indexOf(value);
    console.log(index);

    if (index >= 0) {
      this.members.add(value);
    }

    event.input.value = '';

    this.memberCtrl.setValue(null);
  }

  remove(member: string): void {
    this.members.delete(member);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.members.add(event.option.viewValue);
    this.memberCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allMembers.filter(member => member.toLowerCase().includes(filterValue));
  }

  addMembersToProject(): void {
    console.log(this.members);

    const membersArray = Array.from(this.members);

    this.programService
      .addMembersToProject(membersArray, this.projectName)
      .subscribe(
        (response) => {
          console.log(response);

          this.snackBar.open('Members Added Successfully.', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        (error) => {
          console.log(error);

          this.snackBar.open('Some problem occured.', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      );
  }

  getAllEmployees(managerEmail: string): void {
    this.employeeService.getEmployeesWorkingForAParticularManager(managerEmail).subscribe((response) => {
      console.log(response);
      response.forEach(employee => {
        this.allMembers.push(employee.emailId);
      });
    });
  }

  ngOnInit(): void {
    const email = window.localStorage.getItem('tgt_email');
    this.getAllEmployees(email);
  }
}
