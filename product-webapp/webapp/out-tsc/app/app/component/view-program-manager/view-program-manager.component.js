import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { AddProgramComponent } from '../add-program/add-program.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ViewProgramCardComponent } from '../view-program-card/view-program-card.component';
let ViewProgramManagerComponent = class ViewProgramManagerComponent {
    constructor(programService, dialog) {
        this.programService = programService;
        this.dialog = dialog;
        this.lowValue = 0;
        this.highValue = 8;
        this.panelOpenState = false;
        this.role = '';
    }
    showProgramDetails(programName) {
        console.log(programName);
        this.dialog.open(ViewProgramCardComponent);
    }
    openAddProgramDialog() {
        const dialogForProgram = this.dialog.open(AddProgramComponent, {
            width: '900px',
        });
        dialogForProgram.afterClosed().subscribe(result => {
            if (result) {
                this.getAllPrograms();
            }
        });
    }
    openAddProjectDialog() {
        const dialogForProject = this.dialog.open(AddProjectComponent, {
            width: '900px',
        });
        dialogForProject.afterClosed().subscribe(result => {
            if (result) {
                this.getAllProjects();
            }
        });
    }
    getPaginatorData(event) {
        this.lowValue = event.pageIndex * event.pageSize;
        this.highValue = this.lowValue + event.pageSize;
        return event;
    }
    getAllPrograms() {
        this.programService.getAllPrograms().subscribe((response) => {
            console.log(response);
            this.programArray = response;
            this.length = this.programArray.length;
            console.log(this.programArray);
        }, (error) => {
            console.log(error);
        });
    }
    getAllProgramsByManager(managerEmail) {
        this.programService.getProgramsByManager(managerEmail).subscribe((response) => {
            console.log(response);
            this.programArray = response;
            this.length = this.programArray.length;
        }, (error) => {
            console.log(error);
        });
    }
    getProgramsByDateForEmployee(employeeEmail, dateInMillis) {
        this.programService.getAllActiveProgramsOnParticularDate(employeeEmail, dateInMillis).subscribe((response) => {
            console.log(response);
            this.programArray = response;
            this.length = this.programArray.length;
        }, (error) => {
            console.log(error);
        });
    }
    getAllProjects() {
        this.programService.getAllProjects().subscribe((response) => {
            this.projectArray = response;
            this.projectPaginatorLength = this.projectArray.length;
            console.log(this.projectArray);
        });
    }
    getAllProjectsByManager(managerEmail) {
        this.programService.getProjectsByManager(managerEmail).subscribe((response) => {
            console.log(response);
            this.projectArray = response;
            this.projectPaginatorLength = this.projectArray.length;
        });
    }
    getProjectsByDateForEmployee(employeeEmail, dateInMillis) {
        this.programService.getAllActiveProjectsOnParticularDate(employeeEmail, dateInMillis).subscribe((response) => {
            console.log(response);
            this.projectArray = response;
            this.projectPaginatorLength = this.projectArray.length;
        });
    }
    ngOnInit() {
        this.role = window.localStorage.getItem('role');
        const email = window.localStorage.getItem('tgt_email');
        const today = new Date().getTime();
        console.log(this.role);
        console.log(email);
        switch (this.role) {
            case 'MANAGER':
                this.getAllProgramsByManager(email);
                this.getAllProjectsByManager(email);
                break;
            case 'OPERATIONS':
                this.getAllPrograms();
                this.getAllProjects();
                break;
            case 'EMPLOYEE':
                this.getProgramsByDateForEmployee(email, today);
                this.getProjectsByDateForEmployee(email, today);
                break;
            default:
                break;
        }
    }
};
ViewProgramManagerComponent = __decorate([
    Component({
        selector: 'app-view-program-manager',
        templateUrl: './view-program-manager.component.html',
        styleUrls: ['./view-program-manager.component.css'],
    })
], ViewProgramManagerComponent);
export { ViewProgramManagerComponent };
//# sourceMappingURL=view-program-manager.component.js.map