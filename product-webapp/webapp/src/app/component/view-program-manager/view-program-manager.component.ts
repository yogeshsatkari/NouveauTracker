import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../service/program.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProgramComponent } from '../add-program/add-program.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { PageEvent } from '@angular/material/paginator';
import { ViewProgramCardComponent } from '../view-program-card/view-program-card.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-view-program-manager',
  templateUrl: './view-program-manager.component.html',
  styleUrls: ['./view-program-manager.component.css'],
})

export class ViewProgramManagerComponent implements OnInit {
  length: number;
  pageEvent: PageEvent;

  projectPaginatorLength: number;

  lowValue = 0;
  highValue = 8;

  panelOpenState = false;

  programArray: any;
  projectArray: any;
  role: string;

  showProgramSpinner = true;
  showProjectSpinner = true;

  filterProgramForm: FormGroup;
  filterProjectForm: FormGroup;

  managersArray = [];
  organizationNameArray = new Set();

  constructor(
    private programService: ProgramService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.role = '';

    this.filterProgramForm = formBuilder.group({
      organizationName: new FormControl(),
      programName: new FormControl(),
      programDate: new FormControl(new Date()),
      managerEmailId: new FormControl(),
      programStatus: new FormControl('ACTIVE')
    })

    this.filterProjectForm = formBuilder.group({
      organizationName: new FormControl(),
      projectName: new FormControl(),
      projectDate: new FormControl(new Date()),
      managerEmailId: new FormControl(),
      projectStatus: new FormControl('ACTIVE')
    })

  }

  showProgramDetails(programName: string): void {
    console.log(programName);
    this.dialog.open(ViewProgramCardComponent);
  }


  openAddProgramDialog(): void {
    const dialogForProgram = this.dialog.open(AddProgramComponent, {
      width: '900px',
    });
    dialogForProgram.afterClosed().subscribe(result => {
      console.log(result);
      this.showProgramSpinner = true;
      this.getAllPrograms();
    });
  }

  openAddProjectDialog(): void {
    const dialogForProject = this.dialog.open(AddProjectComponent, {
      width: '900px',
    });


    dialogForProject.afterClosed().subscribe(result => {
      console.log(result);

      this.getAllProjects();
    });
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  getAllPrograms(): void {

    this.programService.getAllPrograms().subscribe((response) => {
      console.log(response);

      this.programArray = response;
      this.length = this.programArray.length;
      this.showProgramSpinner = false;
      console.log(this.programArray);

      response.forEach(program => {
        this.organizationNameArray.add(program.organizationName); 
      })
    }, (error) => {
      console.log(error);
    });
  }

  getAllProgramsByManager(managerEmail: string): void {
    this.programService.getProgramsByManager(managerEmail).subscribe((response) => {
      console.log(response);

      this.programArray = response;
      this.length = this.programArray.length;
      this.showProgramSpinner = false;

      response.forEach(program => {
        this.organizationNameArray.add(program.organizationName);
      })
    }, (error) => {
      console.log(error);
    });
  }

  getProgramsByDateForEmployee(employeeEmail: string, dateInMillis: number): void {
    this.programService.getAllActiveProgramsOnParticularDate(employeeEmail, dateInMillis).subscribe((response) => {
      console.log(response);

      this.programArray = response;
      this.length = this.programArray.length;
      this.showProgramSpinner = false;
    }, (error) => {
      console.log(error);
    });
  }

  filterPrograms(): void {
    this.role = window.localStorage.getItem('role');
    const email = window.localStorage.getItem('tgt_email');

    switch (this.role) {

      case 'OPERATIONS':
        const searchProgramData: FormData = new FormData();
        searchProgramData.append('program', JSON.stringify(this.filterProgramForm.value));

        if (this.filterProgramForm.value.programDate != null) {
          searchProgramData.append('date', JSON.stringify(this.filterProgramForm.value.programDate.getTime()));
        }

        this.programService.searchPrograms(searchProgramData).subscribe((result) => {
          this.programArray = result;
        })
        break;

      case 'MANAGER':
        const searchProgramDataManager: FormData = new FormData();

        searchProgramDataManager.append('program', JSON.stringify(this.filterProgramForm.value));
        searchProgramDataManager.append('manager', email);

        if (this.filterProgramForm.value.programDate != null) {
          searchProgramDataManager.append('date', JSON.stringify(this.filterProgramForm.value.programDate.getTime()));
        }

        this.programService.searchProgramsManager(searchProgramDataManager).subscribe((result) => {
          this.programArray = result;
        })
        break;

      default:
        break;
    }

  }

  resetFilterProgramForm(): void {
    this.filterProgramForm.reset();
    this.getAllPrograms();
  }

  getAllManagers(): void {
    this.employeeService.getEmployeesByRole('MANAGER').subscribe((response) => {
      response.forEach(manager => {
        console.log(manager.emailId);
        this.managersArray.push(manager.emailId);
      });
    });
  }

  getAllProjects(): void {
    this.programService.getAllProjects().subscribe((response) => {
      this.projectArray = response;
      this.projectPaginatorLength = this.projectArray.length;
      console.log(this.projectArray);
      this.showProjectSpinner = false;
    });
  }

  getAllProjectsByManager(managerEmail: string): void {
    this.programService.getProjectsByManager(managerEmail).subscribe((response) => {
      console.log(response);

      this.projectArray = response;
      this.projectPaginatorLength = this.projectArray.length;
      this.showProjectSpinner = false;
    });
  }

  getProjectsByDateForEmployee(employeeEmail: string, dateInMillis: number): void {
    this.programService.getAllActiveProjectsOnParticularDate(employeeEmail, dateInMillis).subscribe((response) => {
      console.log(response);

      this.projectArray = response;
      this.projectPaginatorLength = this.projectArray.length;
      this.showProjectSpinner = false;
    });
  }

  filterProjects(): void {
    this.role = window.localStorage.getItem('role');
    const email = window.localStorage.getItem('tgt_email');

    switch (this.role) {

      case 'OPERATIONS':
        const searchProjectData: FormData = new FormData();
        searchProjectData.append('project', JSON.stringify(this.filterProjectForm.value));

        if (this.filterProjectForm.value.projectDate != null) {
          searchProjectData.append('date', JSON.stringify(this.filterProjectForm.value.projectDate.getTime()));
        }

        this.programService.searchProjects(searchProjectData).subscribe((result) => {
          this.projectArray = result;
        })
        break;

      case 'MANAGER':
        const searchProjectDataManager: FormData = new FormData();
        searchProjectDataManager.append('project', JSON.stringify(this.filterProjectForm.value))
        searchProjectDataManager.append('manager', email);

        if (this.filterProjectForm.value.projectDate) {
          searchProjectDataManager.append('date', JSON.stringify(this.filterProjectForm.value.projectDate.getTime()));
        }

        this.programService.searchProjectManager(searchProjectDataManager).subscribe((result) => {
          console.log(result);
          this.projectArray = result;
        })
        break;

      default:
        break;
    }
  }

  resetFilterProjectForm(): void {
    this.filterProjectForm.reset();
    this.getAllProjects();
  }

  ngOnInit(): void {
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
        this.getAllManagers();
        break;

      case 'EMPLOYEE':
        this.getProgramsByDateForEmployee(email, today);
        this.getProjectsByDateForEmployee(email, today);
        break;

      default:
        break;
    }

    this.programService.getAllActivePrograms('ACTIVE').subscribe((response) => {
      console.log(response);
    })
  }
}
