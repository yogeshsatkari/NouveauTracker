import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public employee: any;
  uploadForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) {}

  getEmployee(emailId: string): void{
    this.employeeService.getEmployee(emailId).subscribe(
      response => {
        console.log('Employee data retrieved : ');
        console.log(response);
        this.employee = response;
        window.localStorage.setItem('role', this.employee.role);
        // console.log("employee object : ");
        // console.log(this.employee);
      },
      error => {
        console.log('error message : ');
        console.log(error);
      }
    );
  }


  ngOnInit(): void {
    this.employee = this.getEmployee(window.localStorage.getItem('tgt_email'));
    this.uploadForm = this.formBuilder.group({
      emailid: '',
      file: ['']
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('file').setValue(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    this.uploadForm.get('emailid').setValue(this.employee.emailId);
    formData.append('emailid', this.uploadForm.get('emailid').value);
    formData.append('file', this.uploadForm.get('file').value);
    this.employeeService.updateUserProfileImage(formData);
    // window.location.href = 'http://localhost:4200/#/home/profile';
    window.location.reload();
    // this.router.navigateByUrl('home/calendar');
  }


}
