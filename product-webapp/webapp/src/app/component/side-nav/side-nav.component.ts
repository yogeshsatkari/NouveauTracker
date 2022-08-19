import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  employee: any;
  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getEmployee(window.localStorage.getItem('tgt_email'));
  }


  getEmployee(emailId: string): void{
    this.employeeService.getEmployee(emailId).subscribe(
      response => {
        // console.log('Employee data retrieved : ');
        // console.log(response);
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


}
