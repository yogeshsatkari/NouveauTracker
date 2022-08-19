import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DailyTrackerService = class DailyTrackerService {
    constructor(http) {
        this.http = http;
    }
    saveTracker(tracker) {
        console.log('Sending tracker to backend:', tracker);
        return this.http.post(`http://localhost:8080/time-tracker-service/api/v1/dailytracker`, tracker);
    }
    getTrackersForPeriod(email, fromDate, toDate) {
        console.log('inside get trackers service:', 'email:', email, 'fromDate:', fromDate, 'toDate:', toDate);
        const paramObject = {
            employeeEmail: email, fromDate, toDate
        };
        return this.http.get(`http://localhost:8080/time-tracker-service/api/v1/employee/dailytrackers/period?employeeEmail=` + email + `&fromDate=` + fromDate + `&toDate=` + toDate);
    }
    updateTracker(tracker) {
        return this.http.put(`http://localhost:8080/time-tracker-service/api/v1/dailytracker`, tracker);
    }
};
DailyTrackerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DailyTrackerService);
export { DailyTrackerService };
//# sourceMappingURL=daily-tracker.service.js.map