import { __decorate } from "tslib";
import { Component } from '@angular/core';
import * as moment from 'moment';
import { TimeTrackerComponent } from '../time-tracker/time-tracker.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { DailyTracker, LeaveType } from 'src/app/model/daily-tracker';
import { ProgramType } from 'src/app/model/program';
import { Log, LogType } from 'src/app/model/log';
let CalendarComponent = class CalendarComponent {
    // CONSTRUCTOR
    constructor(_fb, dialog, apiService) {
        this._fb = _fb;
        this.dialog = dialog;
        this.apiService = apiService;
        // all data variables
        this.trackerListMonth = []; // list of DailyTracker objects for a month displayed
        this.daysInMonth = 0; // captures total number of days in a monmth being displayed
        this.firstDay = 0; // for capturing the weekday from which month starts
        this.month = 0; // use to create tracker object array for a month
        this.year = 0; // used to create tracked object array for a month
        this.employeeEmail = '';
        this.todaysDate = moment(); // keeps current date throughout the program
        this.date = moment(); // used to navigate and show different month tracker object in calendar
        this.desiredDate = new Date(); // ngModel variable to pick date from nav calendar
        this.dailyTrackerForm = this._fb.group({
            calendarDays: this._fb.array([])
        });
        // dummy data for programArray, projectArray. this list will be retrieved for each day by a service
        this.programArray = [{
                organisationBrandLogo: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
                organisationName: 'IBM',
                programType: ProgramType.IMMERSIVE,
                programName: 'IBM-IMMERSIVE',
                startDate: '10/04/2022',
                endDate: '10/08/2022',
                managerEmail: 'ashutosh.kamra@gmail.com',
                members: ['aman.sharma@gmail.com', 'tushar.tuteja@gmail.com']
            }, {
                organisationBrandLogo: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
                organisationName: 'CISCO',
                programType: ProgramType.IMMERSIVE,
                programName: 'CISCO-IMMERSIVE',
                startDate: '10/04/2022',
                endDate: '10/08/2022',
                managerEmail: 'shardul.patel@gmail.com',
                members: ['shrey.gupta@gmail.com', 'raju.nandan@gmail.com']
            }, {
                organisationBrandLogo: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
                organisationName: 'IMT',
                programType: ProgramType.IMMERSIVE,
                programName: 'IMT-IMMERSIVE',
                startDate: '10/04/2022',
                endDate: '10/08/2022',
                managerEmail: 'shardul.patel@gmail.com',
                members: ['shrey.gupta@gmail.com', 'raju.nandan@gmail.com']
            }];
        this.projectArray = [{
                organisationBrandLogo: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
                organisationName: 'IBM',
                programType: ProgramType.IMMERSIVE,
                programName: 'IBM-IMMERSIVE',
                startDate: '10/04/2022',
                endDate: '10/08/2022',
                managerEmail: 'ashutosh.kamra@gmail.com',
                members: ['aman.sharma@gmail.com', 'tushar.tuteja@gmail.com']
            }, {
                organisationBrandLogo: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
                organisationName: 'CISCO',
                programType: ProgramType.IMMERSIVE,
                programName: 'CISCO-IMMERSIVE',
                startDate: '10/04/2022',
                endDate: '10/08/2022',
                managerEmail: 'shardul.patel@gmail.com',
                members: ['shrey.gupta@gmail.com', 'raju.nandan@gmail.com']
            }];
    }
    get calendarDays() {
        return this.dailyTrackerForm.get('calendarDays');
    }
    // ON-INIT METHOD
    ngOnInit() {
        // localStorage.setItem('loginId', 'nikhilsharma@gmail.com');
        this.createMonthTrackers();
    }
    // method to load a picked month
    loadMonth() {
        this.date = moment(this.desiredDate);
        this.createMonthTrackers();
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
        //get tracker data from backend and update in frontend tracker objects of calendar
        this.getAllTrackersFromDB().subscribe((result) => {
            console.log("tracker for whole month from backend", result);
            let trackerListFromDB = result;
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
        return this.apiService.getTrackersForPeriod(localStorage.getItem('tgt_email'), this.firstDayOfMonth.getTime(), this.lastDayOfMonth.getTime());
    }
    // Method to open dailytracker UI for a date
    openDialog(tracker) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        console.log('data sent from calendar:', tracker);
        dialogConfig.data = tracker;
        const dialogRef = this.dialog.open(TimeTrackerComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result) => {
            console.log('Dialog result', result);
            // update the dailyTracker data for this Date
            for (const tracker of this.trackerListMonth) {
                if (result.date == tracker.date) {
                    tracker.logs = result.logs;
                    break;
                }
            }
        });
    }
    // this Method sets attribut currentDay of a Daily Tracker object to TRUE
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
    // methods to navigate and show next and previous months
    showNextMonth() {
        this.date.add(1, 'M');
        this.createMonthTrackers();
    }
    showPreviousMonth() {
        this.date.subtract(1, 'M');
        this.createMonthTrackers();
    }
    // this method identifies saturdays and sundays and sets them as holiday in calendar. this method is called through ngFor from HTML
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
    generateDaysLogs(date) {
        const programs = this.getActivePrograms(date);
        const projects = this.getActiveProjects(date);
        const dayLogs = [];
        const selfStudyLog = new Log(LogType.SELF_LEARNING, 0, 'SelfLearning', '', '');
        dayLogs.push(selfStudyLog);
        for (let i = 0; i < programs.length; i++) {
            const tempLog = new Log(LogType.PROGRAM, 0, programs[i].programName, programs[i].startDate, '');
            dayLogs.push(tempLog);
        }
        for (let i = 0; i < projects.length; i++) {
            const tempLog = new Log(LogType.PROJECT, 0, programs[i].programName, programs[i].startDate, '');
            dayLogs.push(tempLog);
        }
        // API call to backend service to get and update the log hours is not made here yet. it is to be done. PENDING.
        return dayLogs;
    }
    getActivePrograms(date) {
        return this.programArray;
    }
    getActiveProjects(date) {
        return this.projectArray;
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
    monthlySubmission() {
    }
};
CalendarComponent = __decorate([
    Component({
        selector: 'app-calendar',
        templateUrl: './calendar.component.html',
        styleUrls: ['./calendar.component.css']
    })
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map