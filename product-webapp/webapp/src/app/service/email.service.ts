import { Observable } from 'rxjs';
import { MonthlyTracker } from './../model/monthly-tracker';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  requestBody: CustomEmailRequest = new CustomEmailRequest();

  constructor(private httpClient: HttpClient) {}
  // BASE_URL = 'https://nouveautracker.stackroute.io/email-service/';
  BASE_URL = 'http://localhost:8080/email-service/';
  CUSTOM_EMPLOYEE_EMAIL = 'sendemployeecustomemail/';

  revertMonthlyTracker(monthlyTracker: MonthlyTracker): Observable<string> {
    this.requestBody.to = monthlyTracker.employeeEmail;
    this.requestBody.actionToBeTaken = monthlyTracker.remarks;
    this.requestBody.month = monthlyTracker.monthName;
    this.requestBody.subject =
      'REVERTED: Monthly Tracker for ' +
      monthlyTracker.monthName +
      ' ' +
      monthlyTracker.year;
    this.requestBody.year = monthlyTracker.year.toString();
    return this.httpClient.post(
      this.BASE_URL + this.CUSTOM_EMPLOYEE_EMAIL,
      this.requestBody,
      { responseType: 'text' }
    );
  }
}
export class CustomEmailRequest {
  to: string;
  subject: string;
  year: string;
  month: string;
  actionToBeTaken: string;
}
