import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonthlyTracker } from '../model/monthly-tracker';

@Injectable({
  providedIn: 'root',
})
export class MonthlyTrackerService {
  constructor(private httpClient: HttpClient) {}
  // BASE_URL = 'https://nouveautracker.stackroute.io/monthly-tracker-service/api/v1/';
  BASE_URL = 'http://localhost:8080/monthly-tracker-service/api/v1/';
  MONTHLY_TRACKER = 'monthlytracker';
  MONTHLY_TRACKERS = 'filtermonthlytrackers';

  saveMonthlyTracker(monthlyTracker: MonthlyTracker): void {
    this.httpClient.post<MonthlyTracker>(
      this.BASE_URL + this.MONTHLY_TRACKER,
      monthlyTracker
    ).subscribe(res=>console.log("Result of MT save,",res),err=>console.log("error while saving MT",err));
  }

  getAllMonthlyTrackers(
    month: string,
    year: number
  ): Observable<MonthlyTracker[]> {
    console.log(month);

    return this.httpClient.get<MonthlyTracker[]>(
      this.BASE_URL +
        this.MONTHLY_TRACKERS +
        '?month=' +
        month +
        '&year=' +
        year
    );
  }
  ApproveMonthlyTracker(monthlyTracker: MonthlyTracker): Observable<string> {
    return this.httpClient.put(
      this.BASE_URL +
        this.MONTHLY_TRACKER +
        '?id=' +
        monthlyTracker.monthlyTrackerId +
        '&status=' +
        'COMPLETED',
      monthlyTracker,
      { responseType: 'text' }
    );
  }
  RevertMonthlyTracker(monthlyTracker: MonthlyTracker): Observable<string> {
    return this.httpClient.put(
      this.BASE_URL +
        this.MONTHLY_TRACKER +
        '?id=' +
        monthlyTracker.monthlyTrackerId +
        '&status=' +
        'REVERTED',
      monthlyTracker,
      { responseType: 'text' }
    );
  }

  SubmitMonthlyTracker(monthlyTracker: MonthlyTracker): Observable<string> {
    return this.httpClient.put(
      this.BASE_URL +
        this.MONTHLY_TRACKER +
        '?id=' +
        monthlyTracker.monthlyTrackerId +
        '&status=' +
        'SUBMITTED',
      monthlyTracker,
      { responseType: 'text' }
    );
  }
  findMonthlyTrackerById(id: string): Observable<MonthlyTracker> {
    return this.httpClient.get<MonthlyTracker>(
      this.BASE_URL + this.MONTHLY_TRACKER + '?monthlyTrackerID=' + id
    );
  }

  RemarkMonthlyTracker(
    monthlyTrackerId: string,
    remarks: string
  ): Observable<string> {
    return this.httpClient.put(
      this.BASE_URL +
        this.MONTHLY_TRACKER +
        '/revert' +
        '?id=' +
        monthlyTrackerId +
        '&remarks=' +
        remarks,
      null,
      { responseType: 'text' }
    );
  }
}
