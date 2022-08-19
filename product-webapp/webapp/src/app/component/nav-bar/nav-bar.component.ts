import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  // name;

  public employee: any;
  constructor(private employeeService: EmployeeService,
              private snackBar: MatSnackBar,
              private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.getEmployee(window.localStorage.getItem('tgt_email'));
    // this.getUserInfo().subscribe(data => this.name = data.name);
  }

  // getUserInfo(): Observable<any> {
  //   return this.http.get('http://localhost:8084/api/v1/home');
  // }

  getEmployee(emailId: string): void{
    this.employeeService.getEmployee(emailId).subscribe(
      response => {
        console.log('Employee data retrieved : ');
        console.log(response);
        this.employee = response;
        // window.localStorage.setItem('role', this.employee.role);
        // console.log("employee object : ");
        // console.log(this.employee);
      },
      error => {
        console.log('error message : ');
        console.log(error);
      }
    );
  }

  // onUpdateProfileImage() {

  // }

  logout(): void {
    window.localStorage.clear();
    this.snackBar.open('You have been successfully logged out.', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

}
