import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {

  // baseUrl = 'https://nouveautracker.stackroute.io/program-service/api/v1/';
  baseUrl = 'http://localhost:8080/program-service/api/v1/';
  programUrl = this.baseUrl + 'program';
  projectUrl = this.baseUrl + 'project';

  constructor(private http: HttpClient) { }

  getAllPrograms(): Observable<any> {
    return this.http.get(this.baseUrl + '/programs');
  }

  getAllProjects(): Observable<any> {
    return this.http.get(this.baseUrl + '/projects');
  }

  getProgramDetails(programName: string): Observable<any> {
    const url = this.programUrl + '/' + programName;
    return this.http.get(url);
  }

  getProjectDetails(projectName: string): Observable<any> {
    const url = this.projectUrl + '/' + projectName;
    return this.http.get(url);
  }

  addProgram(program: any): Observable<any> {
    return this.http.post(this.programUrl, program);
  }

  addProject(project: any): Observable<any> {
    return this.http.post(this.projectUrl, project);
  }

  addMembersToProgram(program: any, programName: string): Observable<any> {
    console.log("hola");
    console.log(program);
    const url = this.programUrl + '/member/' + programName;
    return this.http.put(url, program);
  }

  addMembersToProject(project: any, projectName: string): Observable<any> {
    const url = this.projectUrl + '/member/' + projectName;
    return this.http.put(url, project);
  }

  getAllActiveProgramsOnParticularDate(memberEmail: string, dateInMillis: number): Observable<any> {
    const url = this.baseUrl + '/programs' + '/member/' + memberEmail + '/' + dateInMillis;
    return this.http.get(url);
  }

  getAllActiveProjectsOnParticularDate(memberEmail: string, dateInMillis: number): Observable<any> {
    const url = this.baseUrl + '/projects' + '/member/' + memberEmail + '/' + dateInMillis;
    return this.http.get(url);
  }

  getProgramsByManager(managerEmail: string): Observable<any> {
    const url = this.baseUrl + '/programs' + '/manager/' + managerEmail;
    return this.http.get(url);
  }

  getProjectsByManager(managerEmail: string): Observable<any> {
    const url = this.baseUrl + '/projects' + '/manager/' + managerEmail;
    return this.http.get(url);
  }

  removeMembersFromProgram(programName: string, memberEmail: string): Observable<any> {
    const url = this.programUrl + '/member/' + programName + '/' + memberEmail;
    return this.http.get(url);
  }

  removeMembersFromProject(projectName: string, memberEmail: string): Observable<any> {
    const url = this.projectUrl + '/member/' + projectName + '/' + memberEmail;
    return this.http.get(url);
  }

  getAllProgramType() {
    const url = this.baseUrl + '/programtype';
    return this.http.get(url);
  }

  getAllActivePrograms(programStatus): Observable<any> {

    const url = this.programUrl + '/status/' + programStatus;
    return this.http.get(url);
  }

  getAllActiveProjects(projectStatus: string): Observable<any> {
    const url = this.projectUrl + '/status/' + projectStatus;
    return this.http.get(url);
  }


  searchPrograms(program: any): Observable<any> {
    const url = this.baseUrl + '/programs/search';
    return this.http.post(url, program);
  }

  searchProjects(project: any): Observable<any> {
    const url = this.baseUrl + '/projects/search';
    return this.http.post(url, project);
  }

  searchProgramsManager(program: any): Observable<any> {
    const url = this.baseUrl + '/programs/manager/search';
    return this.http.post(url, program);
  }

  searchProjectManager(project: any): Observable<any> {
    const url = this.baseUrl + '/projects/manager/search';
    return this.http.post(url, project);
  }

}
