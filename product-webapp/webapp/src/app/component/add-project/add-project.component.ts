import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProgramService } from 'src/app/service/program.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  addProjectForm: FormGroup;
  file: File;
  managersArray = [];

  constructor(
    formBuilder: FormBuilder,
    private programService: ProgramService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {
    this.addProjectForm = formBuilder.group({
      projectName: new FormControl('', Validators.required),
      projectCode: new FormControl('', [Validators.required]),
      costCode: new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required),
      managerEmailId: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllManagers();
  }

  onFileUpload(event: any): void {
    this.file = event.target.files[0];
  }

  saveProject(): void {
    this.addProjectForm.patchValue({
      startDate: this.addProjectForm.value.startDate.getTime(),
      endDate: this.addProjectForm.value.endDate.getTime()
    })

    const projectData: FormData = new FormData();

    projectData.append('image', this.file, this.file.name);
    projectData.append('project', JSON.stringify(this.addProjectForm.value));

    this.programService.addProject(projectData).subscribe(
      (response) => {
        this.snackBar.open('Project Created Successfully.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        this.addProjectForm.reset();
        console.log(response);
      },
      (error) => {
        this.snackBar.open('Some error occured while adding Program.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn']
        });

        console.log(error);
      }
    );
  }

  getAllManagers(): void {
    this.employeeService.getEmployeesByRole('MANAGER').subscribe((response) => {
      // console.log(response);
      response.forEach((manager) => {
        console.log(manager.emailId);
        this.managersArray.push(manager.emailId);
      });
    });
  }
}
