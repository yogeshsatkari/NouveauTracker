import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let ViewProgramCardComponent = class ViewProgramCardComponent {
    constructor(data, programService, matSnackBar) {
        this.data = data;
        this.programService = programService;
        this.matSnackBar = matSnackBar;
    }
    remove(programName, memberEmail) {
        this.programService.removeMembersFromProgram(programName, memberEmail).subscribe((response) => {
            console.log(response);
            this.matSnackBar.open('Member Removed Successfully.', '', {
                duration: 3000,
            });
        }, (error) => {
            this.matSnackBar.open('Some Problem Occured', '', {
                duration: 3000,
            });
        });
    }
    ngOnInit() {
        this.programDetails = this.data;
        this.role = window.localStorage.getItem('role');
    }
};
ViewProgramCardComponent = __decorate([
    Component({
        selector: 'app-view-program-card',
        templateUrl: './view-program-card.component.html',
        styleUrls: ['./view-program-card.component.css'],
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], ViewProgramCardComponent);
export { ViewProgramCardComponent };
//# sourceMappingURL=view-program-card.component.js.map