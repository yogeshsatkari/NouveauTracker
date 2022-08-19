import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { LoginData } from './login-data';
import { RegisterData } from './register-data';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {


  constructor(private employeeService: EmployeeService,
              private router: Router,
              private snackBar: MatSnackBar,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer ) {
                    this.matIconRegistry.addSvgIcon('logo', this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
  }

  googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
  indexOfSelectedTab: number;

  loginData: LoginData;
  registerData: RegisterData;

  hideLoginPassword = true;
  hideRegisterPassword = true;


  // definining formgroup shape to capture while logging in.
  loginFormGroup = new FormGroup ({
    emailId: new FormControl('', Validators.pattern("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")),
    password: new FormControl('', Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,20}")),
  });

  // definining formgroup shape to capture while registering.
  registerFormGroup = new FormGroup ({
    employeeName: new FormControl(''),
    emailId: new FormControl('', Validators.pattern("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")),
    password: new FormControl('', Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,20}") ),
  });

  onLogin(): void {
    this.loginData = this.loginFormGroup.value;
    this.employeeService.login(this.loginData).subscribe(
      response => {
        console.log('User login success : ');
        console.log(response);
        window.localStorage.setItem('tgt', response.token);
        window.localStorage.setItem('tgt_email', response.emailId);
        this.getEmployee(window.localStorage.getItem('tgt_email'));
        // this.loginFormGroup.reset();
       
      },
      error => {
        console.log('error message : ');
        console.log(error);
        this.snackBar.open('Invalid credentials. Please try again.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    );
  }

  getEmployee(emailId: string): void{
    this.employeeService.getEmployee(emailId).subscribe(
      response => {
        console.log('Employee data retrieved : ');
        console.log(response);
        // this.employee = response;
        window.localStorage.setItem('role', response.role);
        if(response.role=='EMPLOYEE') {
          this.router.navigate(['/home/calendar']).then(() => {
          });
        }
        else {
          this.router.navigate(['/home/view-program-manager']).then(() => {
          });
        }
        
        // console.log("employee object : ");
        // console.log(this.employee);
      },
      error => {
        console.log('error message : ');
        console.log(error);
      }
    );
  }


  onRegister(formGroupDirective: FormGroupDirective): void {
    this.registerData = this.registerFormGroup.value;
    this.employeeService.register(this.registerData).subscribe(
      response => {
        console.log('User registration success : ');
        console.log(response);
        this.indexOfSelectedTab = 0;     // to redirect to login tab
        formGroupDirective.resetForm();  // formdirective is used only to reset this form.
        this.snackBar.open('Your account has been created. Please log in.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      },
      error => {
        console.log('error message : ');
        console.log(error);
        this.snackBar.open('User already exists! Please log in', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
    );
  }

  ngOnInit(): void {
  }

  ////////////////////////////////
  // loginUsingGoogle(): void {
  //   this.securityService.login();
  // }

}
