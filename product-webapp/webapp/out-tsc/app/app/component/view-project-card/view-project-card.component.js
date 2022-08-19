import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let ViewProjectCardComponent = class ViewProjectCardComponent {
    constructor(data, programService, matSnackBar) {
        this.data = data;
        this.programService = programService;
        this.matSnackBar = matSnackBar;
    }
    ngOnInit() {
        this.projectDetails = this.data;
    }
    remove(projectName, memberEmail) {
        this.programService.removeMembersFromProject(projectName, memberEmail).subscribe((response) => {
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
};
ViewProjectCardComponent = __decorate([
    Component({
        selector: 'app-view-project-card',
        templateUrl: './view-project-card.component.html',
        styleUrls: ['./view-project-card.component.css']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], ViewProjectCardComponent);
export { ViewProjectCardComponent };
//# sourceMappingURL=view-project-card.component.js.map