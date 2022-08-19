import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SideNavComponent = class SideNavComponent {
    constructor(employeeService) {
        this.employeeService = employeeService;
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
};
SideNavComponent = __decorate([
    Component({
        selector: 'app-side-nav',
        templateUrl: './side-nav.component.html',
        styleUrls: ['./side-nav.component.css']
    })
], SideNavComponent);
export { SideNavComponent };
//# sourceMappingURL=side-nav.component.js.map