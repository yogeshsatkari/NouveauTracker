import { __decorate, __param } from "tslib";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddProgramMembersComponent = class AddProgramMembersComponent {
    constructor(programName, programService, snackBar, employeeService) {
        this.programName = programName;
        this.programService = programService;
        this.snackBar = snackBar;
        this.employeeService = employeeService;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.memberCtrl = new FormControl('');
        this.members = new Set();
        this.allMembers = [];
        this.filteredMembers = this.memberCtrl.valueChanges.pipe(startWith(null), map((member) => (member ? this._filter(member) : this.allMembers.slice())));
    }
    add(event) {
        const value = (event.value || '').trim();
        const index = this.allMembers.indexOf(value);
        if (index >= 0) {
            this.members.add(value);
        }
        event.input.value = '';
        this.memberCtrl.setValue(null);
    }
    remove(member) {
        this.members.delete(member);
    }
    selected(event) {
        this.members.add(event.option.viewValue);
        this.memberCtrl.setValue(null);
    }
    _filter(value) {
        const filterValue = value.toLowerCase();
        return this.allMembers.filter(member => member.toLowerCase().includes(filterValue));
    }
    addMembersToProgram() {
        console.log(this.members);
        const membersArray = Array.from(this.members);
        this.programService
            .addMembersToProgram(membersArray, this.programName)
            .subscribe((response) => {
            console.log(response);
            this.snackBar.open('Members Added Successfully', '', {
                duration: 3000,
            });
        }, (error) => {
            console.log(error);
            this.snackBar.open('Some problem occured.', '', {
                duration: 3000,
            });
        });
    }
    getAllEmployees(managerEmail) {
        this.employeeService.getEmployeesWorkingForAParticularManager(managerEmail).subscribe((response) => {
            console.log(response);
            response.forEach(employee => {
                this.allMembers.push(employee.emailId);
            });
        });
    }
    ngOnInit() {
        const email = window.localStorage.getItem('tgt_email');
        this.getAllEmployees(email);
    }
};
AddProgramMembersComponent = __decorate([
    Component({
        selector: 'app-add-program-members',
        templateUrl: './add-program-members.component.html',
        styleUrls: ['./add-program-members.component.css'],
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddProgramMembersComponent);
export { AddProgramMembersComponent };
//# sourceMappingURL=add-program-members.component.js.map