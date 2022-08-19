import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { AddProgramMembersComponent } from '../add-program-members/add-program-members.component';
import { ViewProgramCardComponent } from '../view-program-card/view-program-card.component';
let ProgramCardComponent = class ProgramCardComponent {
    constructor(sanitizer, dialog, programService) {
        this.sanitizer = sanitizer;
        this.dialog = dialog;
        this.programService = programService;
        this.role = '';
    }
    showProgramDetails(programName) {
        this.programService.getProgramDetails(programName).subscribe((response) => {
            this.dialog.open(ViewProgramCardComponent, {
                width: '600px',
                data: response,
            });
        });
    }
    addProgramMembers(event, programName) {
        event.stopPropagation();
        this.dialog.open(AddProgramMembersComponent, {
            width: '600px',
            data: programName,
        });
        console.log('Add Members to ' + programName);
    }
    ngOnInit() {
        this.role = window.localStorage.getItem('role');
        this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.programData.organizationBrandLogo);
    }
};
__decorate([
    Input()
], ProgramCardComponent.prototype, "programData", void 0);
ProgramCardComponent = __decorate([
    Component({
        selector: 'app-program-card',
        templateUrl: './program-card.component.html',
        styleUrls: ['./program-card.component.css'],
    })
], ProgramCardComponent);
export { ProgramCardComponent };
//# sourceMappingURL=program-card.component.js.map