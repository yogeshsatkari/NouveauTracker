import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyTracker } from '../model/daily-tracker';
import { DailyTrackerModel } from '../model/daily-tracker-model';

@Injectable({
  providedIn: 'root',
})
export class DailyTrackerService {
  // baseUrl='https://nouveautracker.stackroute.io/time-tracker-service/api/v1/';
   baseUrl='http://localhost:8080/time-tracker-service/api/v1/';
  //  baseUrl='http://localhost:8082/api/v1/';


  constructor(private http: HttpClient) {}


  saveTracker(tracker: DailyTrackerModel): Observable<DailyTrackerModel> {
    console.log('Sending tracker to backend:', tracker);
    return this.http.post<DailyTrackerModel>(
     this.baseUrl+`dailytracker`,
      tracker
    );
  }
  getDailyTrackersForPeriod(start:number,end:number){
    return this.http.get(this.baseUrl+"dailytrackers/daterange?from="+start+"&to="+end);
  }

  getTrackersForPeriod(email: string, fromDate: number, toDate: number): Observable<DailyTracker[]> {
    console.log(
      'inside get trackers service:',
      'email:',
      email,
      'fromDate:',
      fromDate,
      'toDate:',
      toDate
    );
    const paramObject = {
      employeeEmail: email,
      fromDate,
      toDate,
    };
    return this.http.get<DailyTracker[]>(
      this.baseUrl+`employee/dailytrackers/period?employeeEmail=` +
        email +
        `&fromDate=` +
        fromDate +
        `&toDate=` +
        toDate
    );
  }
  updateTracker(tracker: DailyTrackerModel): Observable<object> {
    return this.http.put(
      this.baseUrl+`dailytracker`,
      tracker
    );
  }

  //For Reports

  getAllPendingDailyTrackers(): Observable<object> {
    return this.http.get(
     this.baseUrl+'dailytrackers/pending'
    );
  }

  getAllProgramHoursByEmployee(employeeEmail: string): Observable<object> {
    return this.http.get(
      this.baseUrl+'allprograms/hours?email=' +
        employeeEmail
    );
  }

  getAllProjectHoursByEmployee(employeeEmail: string): Observable<object> {
    return this.http.get(
      this.baseUrl+'allprojects/hours?email=' +
        employeeEmail
    );
  }

  getAllProjectHours(): Observable<object> {
    return this.http.get(
      this.baseUrl+'project/hours'
    );
  }

  getAllProgramHours(): Observable<object> {
    return this.http.get(
     this.baseUrl+'program/hours'
    );
  }

  getAllProgramsHoursForManager(managerEmail: string): Observable<object>{
    return this.http.get(
      this.baseUrl+'manager/allprograms/hours?email='+managerEmail
    );
  }

  getAllProjectsHoursForManager(managerEmail: string): Observable<object>{
    return this.http.get(
      this.baseUrl+'manager/allprojects/hours?email='+managerEmail
    );
  }
  getAllDailyTrackers(month:number,year:number){
    return this.http.get<DailyTracker[]>(this.baseUrl+"dailytrackers/monthly?month="+month+"&year="+year);
  }
}
