import { __decorate } from "tslib";
import { Component } from '@angular/core';
let NavBarComponent = class NavBarComponent {
    constructor(employeeService, snackBar) {
        this.employeeService = employeeService;
        this.snackBar = snackBar;
    }
    ngOnInit() {
        this.getEmployee(window.localStorage.getItem('tgt_email'));
    }
    getEmployee(emailId) {
        this.employeeService.getEmployee(emailId).subscribe(response => {
            console.log('Employee data retrieved : ');
            console.log(response);
            this.employee = response;
            window.localStorage.setItem('role', this.employee.role);
            // console.log("employee object : ");
            // console.log(this.employee);
        }, error => {
            console.log('error message : ');
            console.log(error);
        });
    }
    // onUpdateProfileImage() {
    // }
    logout() {
        window.localStorage.clear();
        this.snackBar.open('You have been successfully logged out.', '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-primary']
        });
    }
};
NavBarComponent = __decorate([
    Component({
        selector: 'app-nav-bar',
        templateUrl: './nav-bar.component.html',
        styleUrls: ['./nav-bar.component.css']
    })
], NavBarComponent);
export { NavBarComponent };
//# sourceMappingURL=nav-bar.component.js.map