import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as moment from 'moment';
import { DailyTracker, LeaveType } from 'src/app/model/daily-tracker';
let MonthlyTrackerDetailsComponent = class MonthlyTrackerDetailsComponent {
    constructor(apiService, route) {
        this.apiService = apiService;
        this.route = route;
        // all data variables
        this.trackerListMonth = []; // list of DailyTracker objects for a month displayed
        this.daysInMonth = 0; // captures total number of days in a monmth being displayed
        this.firstDay = 0; // for capturing the weekday from which month starts
        this.month = 0; // use to create tracker object array for a month
        this.year = 0; // used to create tracked object array for a month
        this.employeeEmail = '';
        this.todaysDate = moment(); // keeps current date throughout the program
        this.date = moment(); // used to navigate and show different month tracker object in calendar
        this.hideDetails = true;
        this.logsForDay = [];
        this.selectedDate = []; // date selected for details in Day details box. index 0 holds date, 1 holds month, 2 holds year
    }
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const email = params.email;
            const month = params.month;
            const year = params.year;
            // let dateStr=month+'-01-'+year;
            let dateStr = '06-01-2022';
            let tempDate = new Date(dateStr);
            let tempMoment = moment(tempDate);
            this.date = tempMoment;
        });
        this.createMonthTrackers();
    }
    // this method shows a Days logs in the DayDetails box in UI on click of a calendar date tile
    showLogs(tracker) {
        this.selectedDate[0] = tracker.date.getDate();
        this.selectedDate[1] = tracker.date.getMonth();
        this.selectedDate[2] = tracker.date.getFullYear();
        this.logsForDay = tracker.logs;
    }
    // method to Create DailyTracker objects for a month
    createMonthTrackers() {
        this.trackerListMonth = [];
        this.daysInMonth = moment(this.date).daysInMonth();
        this.firstDay = moment(this.date).startOf('M').weekday(); // gives weekday for first day of month in number e.g 5 for friday
        this.month = this.date.month() + 1; // month() returns 6 for July, we need to have 7 for july
        this.year = this.date.year();
        for (let j = 0; j < this.firstDay; j++) // loop to make state=false for inserting null trackers to shift first day of month to correct weekday in calendar
         {
            const temp = new DailyTracker(new Date(), false);
            this.trackerListMonth.unshift(temp);
        }
        for (let i = 1; i <= this.daysInMonth; i++) {
            const dateStr = this.year + '-' + this.month + '-' + i;
            if (i == 1) {
                this.firstDayOfMonth = new Date(dateStr); // capture first DATE of month
            }
            if (i == this.daysInMonth) {
                this.lastDayOfMonth = new Date(dateStr); // capture last DATE of month
            }
            const temp = new DailyTracker(new Date(dateStr), true);
            temp.employeeEmail = this.employeeEmail;
            this.trackerListMonth.push(temp);
        }
        this.showCurrentDay();
        console.table(this.trackerListMonth);
        // get tracker data from backend and update in frontend tracker objects of calendar
        this.getAllTrackersFromDB().subscribe((result) => {
            console.log('tracker for whole month from backend', result);
            const trackerListFromDB = result;
            for (let i = 0; i < trackerListFromDB.length; i++) {
                for (let j = 0; j < this.trackerListMonth.length; j++) {
                    if (trackerListFromDB[i].date == this.trackerListMonth[j].date.getTime()) // if dates match
                     {
                        this.trackerListMonth[j].leaveType = trackerListFromDB[i].leaveType;
                        this.trackerListMonth[j].logs = trackerListFromDB[i].logs;
                        this.trackerListMonth[j].remarks = trackerListFromDB[i].remarks;
                        this.trackerListMonth[j].trackerId = trackerListFromDB[i].dailyTrackerID;
                        this.trackerListMonth[j].employeeEmail = trackerListFromDB[i].employeeEmail;
                        break;
                    }
                }
            }
        });
    }
    // method for API call to get all dailyTrackers for a month
    getAllTrackersFromDB() {
        return this.apiService.getTrackersForPeriod(localStorage.getItem('loginId'), this.firstDayOfMonth.getTime(), this.lastDayOfMonth.getTime());
    }
    showCurrentDay() {
        for (const tracker of this.trackerListMonth) {
            if (this.todaysDate.date() == tracker.date.getDate() && this.todaysDate.month() == tracker.date.getMonth() && this.todaysDate.year() == tracker.date.getFullYear()) {
                tracker.currentDay = true;
            }
            else {
                tracker.currentDay = false;
            }
        }
    }
    getTotalLoggedHours(tracker) {
        let sum = 0;
        for (const log of tracker.logs) {
            sum += log.logHours;
        }
        return sum;
    }
    isFullDayLeave(tracker) {
        if (tracker.leaveType == LeaveType.FULLDAY) {
            return true;
        }
        else {
            return false;
        }
    }
    isHalfdayLeave(tracker) {
        if (tracker.leaveType == LeaveType.HALF_DAY) {
            return true;
        }
        else {
            return false;
        }
    }
    isWeekend(tracker) {
        if (tracker.date.getDay() == 0 || tracker.date.getDay() == 6) {
            tracker.leaveType = LeaveType.NONE;
            tracker.state = false;
            return true;
        }
        else {
            return false;
        }
    }
    // this method disbales all future dates for editing
    isFutureDate(tracker) {
        const trackerMomemnt = moment(tracker.date);
        const currentMoment = moment(this.todaysDate);
        if (trackerMomemnt.isSameOrBefore(currentMoment)) { // if tracker date is earlier than current date
            return false; // do not disable
        }
        else {
            return true;
        } // disable
    }
    showDetails(tracker) {
        console.log('inside showdetails');
        this.hideDetails = false;
    }
};
MonthlyTrackerDetailsComponent = __decorate([
    Component({
        selector: 'app-monthly-tracker-details',
        templateUrl: './monthly-tracker-details.component.html',
        styleUrls: ['./monthly-tracker-details.component.css'],
    })
], MonthlyTrackerDetailsComponent);
export { MonthlyTrackerDetailsComponent };
//# sourceMappingURL=monthly-tracker-details.component.js.map