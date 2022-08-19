import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { AddProjectMembersComponent } from '../add-project-members/add-project-members.component';
import { ViewProjectCardComponent } from '../view-project-card/view-project-card.component';
let ProjectCardComponent = class ProjectCardComponent {
    constructor(sanitizer, dialog, programService) {
        this.sanitizer = sanitizer;
        this.dialog = dialog;
        this.programService = programService;
        this.role = '';
    }
    showProjectDetails(projectName) {
        console.log(projectName);
        this.programService.getProjectDetails(projectName).subscribe((response) => {
            console.log(response);
            this.dialog.open(ViewProjectCardComponent, {
                width: '600px',
                data: response,
            });
        });
    }
    addProjectMembers(event, projectName) {
        event.stopPropagation();
        this.dialog.open(AddProjectMembersComponent, {
            width: '600px',
            data: projectName,
        });
        console.log(projectName);
    }
    ngOnInit() {
        this.role = window.localStorage.getItem('role');
        this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.projectData.organizationBrandLogo);
    }
};
__decorate([
    Input()
], ProjectCardComponent.prototype, "projectData", void 0);
ProjectCardComponent = __decorate([
    Component({
        selector: 'app-project-card',
        templateUrl: './project-card.component.html',
        styleUrls: ['./project-card.component.css'],
    })
], ProjectCardComponent);
export { ProjectCardComponent };
//# sourceMappingURL=project-card.component.js.map