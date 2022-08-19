import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let RegisterLoginComponent = class RegisterLoginComponent {
    constructor(employeeService, router, snackBar, matIconRegistry, domSanitizer) {
        this.employeeService = employeeService;
        this.router = router;
        this.snackBar = snackBar;
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
        this.hideLoginPassword = true;
        this.hideRegisterPassword = true;
        // definining formgroup shape to capture while logging in.
        this.loginFormGroup = new FormGroup({
            emailId: new FormControl('', Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')),
            password: new FormControl(''),
        });
        // definining formgroup shape to capture while registering.
        this.registerFormGroup = new FormGroup({
            employeeName: new FormControl(''),
            emailId: new FormControl('', Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')),
            password: new FormControl(''),
        });
        this.matIconRegistry.addSvgIcon('logo', this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
    }
    onLogin() {
        this.loginData = this.loginFormGroup.value;
        this.employeeService.login(this.loginData).subscribe(response => {
            console.log('User login success : ');
            console.log(response);
            window.localStorage.setItem('tgt', response.token);
            window.localStorage.setItem('tgt_email', response.emailId);
            // this.loginFormGroup.reset();
            this.router.navigate(['/home/calendar']).then(() => {
                this.snackBar.open('Logged in successfully.', '', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    panelClass: ['mat-toolbar', 'mat-primary']
                });
            });
        }, error => {
            console.log('error message : ');
            console.log(error);
            this.snackBar.open('Invalid credentials. Please try again.', '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['mat-toolbar', 'mat-warn']
            });
        });
    }
    onRegister(formGroupDirective) {
        this.registerData = this.registerFormGroup.value;
        this.employeeService.register(this.registerData).subscribe(response => {
            console.log('User registration success : ');
            console.log(response);
            this.indexOfSelectedTab = 0; // to redirect to login tab
            formGroupDirective.resetForm(); // formdirective is used only to reset this form.
            this.snackBar.open('Your account has been created. Please log in.', '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['mat-toolbar', 'mat-primary']
            });
        }, error => {
            console.log('error message : ');
            console.log(error);
            this.snackBar.open('User already exists! Please log in', '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['mat-toolbar', 'mat-warn']
            });
        });
    }
    ngOnInit() {
    }
};
RegisterLoginComponent = __decorate([
    Component({
        selector: 'app-register-login',
        templateUrl: './register-login.component.html',
        styleUrls: ['./register-login.component.css']
    })
], RegisterLoginComponent);
export { RegisterLoginComponent };
//# sourceMappingURL=register-login.component.js.map