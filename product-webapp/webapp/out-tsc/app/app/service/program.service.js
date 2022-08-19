import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ProgramService = class ProgramService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8080/program-service/api/v1';
        this.programUrl = this.baseUrl + 'program';
        this.projectUrl = this.baseUrl + 'project';
    }
    getAllPrograms() {
        return this.http.get(this.baseUrl + '/programs');
    }
    getAllProjects() {
        return this.http.get(this.baseUrl + '/projects');
    }
    getProgramDetails(programName) {
        const url = this.programUrl + '/' + programName;
        return this.http.get(url);
    }
    getProjectDetails(projectName) {
        const url = this.projectUrl + '/' + projectName;
        return this.http.get(url);
    }
    addProgram(program) {
        return this.http.post(this.programUrl, program);
    }
    addProject(project) {
        return this.http.post(this.projectUrl, project);
    }
    addMembersToProgram(program, programName) {
        const url = this.programUrl + '/member/' + programName;
        return this.http.put(url, program);
    }
    addMembersToProject(project, projectName) {
        const url = this.projectUrl + '/member/' + projectName;
        return this.http.put(url, project);
    }
    getAllActiveProgramsOnParticularDate(memberEmail, dateInMillis) {
        const url = this.baseUrl + '/programs' + '/member/' + memberEmail + '/' + dateInMillis;
        return this.http.get(url);
    }
    getAllActiveProjectsOnParticularDate(memberEmail, dateInMillis) {
        const url = this.baseUrl + '/projects' + '/member/' + memberEmail + '/' + dateInMillis;
        return this.http.get(url);
    }
    getProgramsByManager(managerEmail) {
        const url = this.baseUrl + '/programs' + '/manager/' + managerEmail;
        return this.http.get(url);
    }
    getProjectsByManager(managerEmail) {
        const url = this.baseUrl + '/projects' + '/manager/' + managerEmail;
        return this.http.get(url);
    }
    removeMembersFromProgram(programName, memberEmail) {
        const url = this.programUrl + '/member/' + programName + '/' + memberEmail;
        return this.http.get(url);
    }
    removeMembersFromProject(projectName, memberEmail) {
        const url = this.projectUrl + '/member/' + projectName + '/' + memberEmail;
        return this.http.get(url);
    }
    getAllProgramType() {
        const url = this.baseUrl + '/programtype';
        return this.http.get(url);
    }
};
ProgramService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ProgramService);
export { ProgramService };
//# sourceMappingURL=program.service.js.map