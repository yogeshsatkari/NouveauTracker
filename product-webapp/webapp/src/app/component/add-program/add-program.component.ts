import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProgramService } from 'src/app/service/program.service';
import { ViewProgramManagerComponent } from '../view-program-manager/view-program-manager.component';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.css'],
})
export class AddProgramComponent implements OnInit {
  addProgramForm: FormGroup;
  file: File;
  viewProgram: ViewProgramManagerComponent;

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  programType: any;

  managersArray = [];

  constructor(
    formBuilder: FormBuilder,
    private programService: ProgramService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {
    this.addProgramForm = formBuilder.group({
      organizationName: new FormControl('', Validators.required),
      programName: new FormControl('', Validators.required),
      programType: new FormControl('', Validators.required),
      programCode: new FormControl('', Validators.required),
      costCode: new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required),
      managerEmailId: new FormControl('', Validators.required),
      startDate: new FormControl(Validators.required),
      endDate: new FormControl(Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  onFileUpload(event: any): void {
    this.file = event.target.files[0];
    this.fileAttr = event.target.files[0].name;
  }

  getProgramTypes(): void {
    this.programService.getAllProgramType().subscribe((response) => {
      this.programType = response;
    });
  }

  saveProgram(): void {
    this.addProgramForm.patchValue({
      startDate: this.addProgramForm.value.startDate.getTime(),
      endDate: this.addProgramForm.value.endDate.getTime()
    })

    console.log(this.addProgramForm.value);

    const programData: FormData = new FormData();

    programData.append('image', this.file, this.file.name);
    programData.append('program', JSON.stringify(this.addProgramForm.value));

    this.programService.addProgram(programData).subscribe(
      (response) => {
        this.snackBar.open('Program Created Successfully.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary']
        });

        this.addProgramForm.reset();
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
      response.forEach(manager => {
        console.log(manager.emailId);
        this.managersArray.push(manager.emailId);
      });
    });
  }

  ngOnInit(): void {
    this.getProgramTypes();
    this.getAllManagers();
  }
}
