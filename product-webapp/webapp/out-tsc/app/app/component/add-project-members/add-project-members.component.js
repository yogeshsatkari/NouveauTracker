import { __decorate, __param } from "tslib";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let AddProjectMembersComponent = class AddProjectMembersComponent {
    constructor(projectName, programService, snackBar, employeeService) {
        this.projectName = projectName;
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
        console.log(index);
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
    addMembersToProject() {
        console.log(this.members);
        const membersArray = Array.from(this.members);
        this.programService
            .addMembersToProject(membersArray, this.projectName)
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
AddProjectMembersComponent = __decorate([
    Component({
        selector: 'app-add-project-members',
        templateUrl: './add-project-members.component.html',
        styleUrls: ['./add-project-members.component.css'],
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], AddProjectMembersComponent);
export { AddProjectMembersComponent };
//# sourceMappingURL=add-project-members.component.js.map