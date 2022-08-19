import { __decorate } from "tslib";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
let EmployeeService = class EmployeeService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.userAuthenticationBaseUrl = 'http://localhost:8080/authentication-service/api/v1/account'; // for register/login in mySql
        this.userEmployeeServiceBaseUrl = 'http://localhost:8080/employee-service/api/v1/employee'; // for updation of employee in mongoDB
    }
    register(registerData) {
        return this.httpClient.post(this.userAuthenticationBaseUrl + '/register', registerData);
    }
    login(loginData) {
        return this.httpClient.post(this.userAuthenticationBaseUrl + '/login', loginData);
    }
    getEmployee(emailId) {
        const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('tgt'));
        return this.httpClient.get(this.userEmployeeServiceBaseUrl + '/employee?emailid=' + emailId, { headers: reqHeader });
    }
    getEmployeesByRole(role) {
        const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('tgt'));
        return this.httpClient.get(this.userEmployeeServiceBaseUrl + '/byrole?role=' + role, { headers: reqHeader });
    }
    getEmployeesWorkingForAParticularManager(managerEmailId) {
        const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('tgt'));
        return this.httpClient.get(this.userEmployeeServiceBaseUrl + '/bymanageremailid?manageremailid=' + managerEmailId, { headers: reqHeader });
    }
    updateUserProfileImage(formData) {
        const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('tgt'));
        return this.httpClient.put(this.userEmployeeServiceBaseUrl + '/profileimage', formData, { 'headers': reqHeader }).subscribe((res) => console.log(res), (err) => console.log(err));
    }
};
EmployeeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EmployeeService);
export { EmployeeService };
//# sourceMappingURL=employee.service.js.map