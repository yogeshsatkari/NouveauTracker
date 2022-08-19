import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let MonthlyTrackerService = class MonthlyTrackerService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.BASE_URL = 'http://localhost:8080/monthly-tracker-service/api/v1/';
        this.MONTHLY_TRACKER = 'monthlytracker';
        this.MONTHLY_TRACKERS = 'filtermonthlytrackers';
    }
    saveMonthlyTracker(monthlyTracker) {
        this.httpClient.post(this.BASE_URL + this.MONTHLY_TRACKER, monthlyTracker);
    }
    getAllMonthlyTrackers(month, year) {
        console.log(month);
        return this.httpClient.get(this.BASE_URL + this.MONTHLY_TRACKERS +
            '?month=' +
            month +
            '&year=' +
            year);
    }
    ApproveMonthlyTracker(monthlyTracker) {
        return this.httpClient.put(this.BASE_URL +
            this.MONTHLY_TRACKER +
            '?id=' +
            monthlyTracker.monthlyTrackerId +
            '&status=' +
            'COMPLETED', monthlyTracker, { responseType: 'text' });
    }
    RevertMonthlyTracker(monthlyTracker) {
        return this.httpClient.put(this.BASE_URL +
            this.MONTHLY_TRACKER +
            '?id=' +
            monthlyTracker.monthlyTrackerId +
            '&status=' +
            'REVERTED', monthlyTracker, { responseType: 'text' });
    }
    SubmitMonthlyTracker(monthlyTracker) {
        return this.httpClient.put(this.BASE_URL +
            this.MONTHLY_TRACKER +
            '?id=' +
            monthlyTracker.monthlyTrackerId +
            '&status=' +
            'SUBMITTED', monthlyTracker, { responseType: 'text' });
    }
};
MonthlyTrackerService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], MonthlyTrackerService);
export { MonthlyTrackerService };
//# sourceMappingURL=monthly-tracker.service.js.map