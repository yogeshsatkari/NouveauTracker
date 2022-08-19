import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let EmailService = class EmailService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.requestBody = new CustomEmailRequest();
        this.BASE_URL = 'http://localhost:8080/email-service/';
        this.CUSTOM_EMPLOYEE_EMAIL = 'sendemployeecustomemail/';
    }
    revertMonthlyTracker(monthlyTracker) {
        this.requestBody.to = monthlyTracker.employeeEmail;
        this.requestBody.actionToBeTaken = monthlyTracker.remarks;
        this.requestBody.month = monthlyTracker.monthName;
        this.requestBody.subject = "REVERTED: Monthly Tracker for " + monthlyTracker.monthName + " " + monthlyTracker.year;
        this.requestBody.year = monthlyTracker.year.toString();
        return this.httpClient.post(this.BASE_URL + this.CUSTOM_EMPLOYEE_EMAIL, this.requestBody, { responseType: 'text' });
    }
};
EmailService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EmailService);
export { EmailService };
export class CustomEmailRequest {
}
//# sourceMappingURL=email.service.js.map