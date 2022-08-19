import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveType } from 'src/app/model/daily-tracker';
import { DailyTrackerModel } from 'src/app/model/daily-tracker-model';
import { Log, LogType } from 'src/app/model/log';
import { SnackbarComponent } from '../snackbar/snackbar.component';
let TimeTrackerComponent = class TimeTrackerComponent {
    constructor(dialogRef, formBuilder, render, elem, _snackBar, _data, trackerApi, progServ) {
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.render = render;
        this.elem = elem;
        this._snackBar = _snackBar;
        this._data = _data;
        this.trackerApi = trackerApi;
        this.progServ = progServ;
        this.currentDate = new Date();
        this.date = '';
        this.hdStatus = 'NotApplied';
        this.leaves = [LeaveType.NONE, LeaveType.HALF_DAY, LeaveType.FULLDAY];
        this.leaveApplied = LeaveType.NONE; // ng model variable to capture leave applied value
        this.programLogArray = [];
        this.projectLogArray = [];
        this.programArray = [];
        this.projectArray = [];
        this.cardArray2 = [1, 2, 3];
        this.cardArray3 = [1];
        this.totalHoursOfDay = 0;
        this.centered = false;
        this.disabled = false;
        this.unbounded = false;
        this.radius = 200;
        this.color = '';
        this.logMsg = '';
        this.snackbarDurationSec = 5;
        this.trackerCreated = false;
        let slHourInit = 0;
        let slDetailsInit = '';
        for (let i = 0; i < _data.logs.length; i++) {
            if (_data.logs[i].logType == LogType.SELF_LEARNING) {
                slHourInit = _data.logs[i].logHours;
                slDetailsInit = _data.logs[i].selfStudyDetails;
            }
        }
        this.dailyTracker = this.formBuilder.group({
            progTimeLogs: this.formBuilder.array([]),
            projTimeLogs: this.formBuilder.array([]),
            slDetails: new FormControl('no Details'),
            slHours: new FormControl(slHourInit),
            remarks: new FormControl(slDetailsInit),
        });
    }
    ngOnInit() {
        // display data recieved from CALENDAR to DIALOG on console
        this.calTotalHoursOfDay();
        this.logMsg = this.totalHoursOfDay + ' hrs. logged.';
        // generate a fresh trackerID if no trackerId already exists on the dailyTracker object i.e the object is being created for first time. Generate FormArray for the new tracker object
        if (this._data.trackerId == '') {
            this.trackerCreated = true;
            console.log('creating a new trackerObject line 217 ');
            this.createFormArray_NewTracker();
        }
        else {
            this.trackerCreated = false;
            this.createFormArray_TrackerExists();
        }
    }
    // this method returns true if Logged hours for day =8, else returns false
    totalHoursValid() {
        if (this.totalHoursOfDay == 8) {
            return true;
        }
        else {
            return false;
        }
    }
    get progTimeLogsArray() {
        return this.dailyTracker.get('progTimeLogs');
    }
    get projTimeLogsArray() {
        return this.dailyTracker.get('projTimeLogs');
    }
    // method to open snackbar incase hours logged <8 and user clicks SAVE
    openSnackbar() {
        this._snackBar.openFromComponent(SnackbarComponent, { duration: this.snackbarDurationSec * 1000 });
    }
    // method to generate formControls in each array program, project
    createFormArray_TrackerExists() {
        for (let i = 0; i < this._data.logs.length; i++) {
            switch (this._data.logs[i].logType) {
                case LogType.PROJECT:
                    this.projectLogArray.push(this._data.logs[i]); // add this log to projectlogarray
                    this.projTimeLogsArray.push(new FormControl(this._data.logs[i].logHours));
                    break;
                case LogType.PROGRAM:
                    this.programLogArray.push(this._data.logs[i]); // add this log to programlogarray
                    this.progTimeLogsArray.push(new FormControl(this._data.logs[i].logHours));
                    break;
                case LogType.SELF_LEARNING: break;
                default: console.log('wrong log type found');
            }
        }
    }
    createFormArray_NewTracker() {
        this.generateTrackerId();
        this._data.logs = this.generateDaysLogs(this._data.date); // create log array for tracker object, by calling program/project api
        for (let i = 0; i < this._data.logs.length; i++) {
            switch (this._data.logs[i].logType) {
                case LogType.PROJECT:
                    this.projectLogArray.push(this._data.logs[i]); // add this log to projectlogarray
                    this.projTimeLogsArray.push(new FormControl(this._data.logs[i].logHours));
                    break;
                case LogType.PROGRAM:
                    this.programLogArray.push(this._data.logs[i]); // add this log to programlogarray
                    this.progTimeLogsArray.push(new FormControl(this._data.logs[i].logHours));
                    break;
                case LogType.SELF_LEARNING: break;
                default: console.log('wrong log type found');
            }
        }
    }
    // submit daily tracker
    submitDailyTracker(element1, element2) {
        this.calTotalHoursOfDay();
        console.log('total hours logged=', this.totalHoursOfDay);
        console.log(this.dailyTracker.value);
        this.updateLogData_LeaveStatus(); // update latest info from the form to send back to calendar. _data is updated
        if (this.leaveApplied == 'FULLDAY') {
            this._data.logs = []; // just before submission, check if FULLDAY leave is applied. If YES, send empty Log array to backend
        }
        if (this.totalHoursValid()) {
            console.log(this.dailyTracker.value);
            if (this.trackerCreated) // if a new tracker is just created, call the SAVE api
             {
                this.trackerApi.saveTracker(this.createDailyTrackerForBackend()).subscribe((response) => console.log('response from save api from backend', response)); // api call to save the Daily tracker to backend
                this.dialogRef.close(this._data);
            }
            else // if its an existing tracker, call UPDATE api
             {
                this.trackerApi.updateTracker(this.createDailyTrackerForBackend()).subscribe(response => console.log('response from Update Api:', response));
                this.dialogRef.close(this._data);
            }
        }
        else {
            if (this.totalHoursOfDay > 8) {
                this.render.setStyle(element1, 'box-shadow', '0 0 5px red,0 0 7px rgb(237, 180, 180)');
                this.render.setStyle(element2, 'box-shadow', '0 0 5px red,0 0 7px rgb(237, 180, 180)');
                this.logMsg = this.totalHoursOfDay + 'hrs logged. Log Exact 8hrs pls.';
            }
            else {
                if (this.trackerCreated) { // if a new tracker is just created, call the SAVE api
                    console.log(this.dailyTracker.value);
                    this.trackerApi.saveTracker(this.createDailyTrackerForBackend()).subscribe((response) => console.log('response from save api from backend', response));
                    this.openSnackbar();
                    this.dialogRef.close(this._data);
                }
                else // if its an existing tracker, call UPDATE api
                 {
                    this.trackerApi.updateTracker(this.createDailyTrackerForBackend()).subscribe(response => console.log('response from Update Api:', response));
                    this.dialogRef.close(this._data);
                }
            }
        }
    }
    calTotalHoursOfDay() {
        var _a;
        this.totalHoursOfDay = 0;
        let leaveHours = 0;
        switch (this.leaveApplied) {
            case LeaveType.NONE:
                leaveHours = 0;
                break;
            case LeaveType.HALF_DAY:
                leaveHours = 4;
                break;
            case LeaveType.FULLDAY:
                leaveHours = 8;
                break;
            default: console.log('wrong leave type entered');
        }
        this.totalHoursOfDay += leaveHours;
        for (let i = 0; i < this.progTimeLogsArray.length; i++) { // add prog log hours
            this.totalHoursOfDay += this.progTimeLogsArray.value[i];
        }
        for (let i = 0; i < this.projTimeLogsArray.length; i++) { // add proj log hours
            this.totalHoursOfDay += this.projTimeLogsArray.value[i];
        }
        this.totalHoursOfDay += (_a = this.dailyTracker.get('slHours')) === null || _a === void 0 ? void 0 : _a.value; // add self learning hours
        console.log('at end of calculate method:', this.totalHoursOfDay);
    }
    closeDialogue() {
        this.dialogRef.close();
    }
    // method to create a dailytracker object that will be returned to calendar when dailyTracker is saved &closed
    updateLogData_LeaveStatus() {
        var _a, _b;
        for (let i = 0; i < this.programLogArray.length; i++) {
            this.programLogArray[i].logHours = this.dailyTracker.get('progTimeLogs').value[i];
        }
        for (let i = 0; i < this.projectLogArray.length; i++) {
            this.projectLogArray[i].logHours = this.dailyTracker.get('projTimeLogs').value[i];
        }
        const selfLearningLog = new Log(LogType.SELF_LEARNING, (_a = this.dailyTracker.get('slHours')) === null || _a === void 0 ? void 0 : _a.value, 'SelfLearning', '', (_b = this.dailyTracker.get('slDetails')) === null || _b === void 0 ? void 0 : _b.value);
        this._data.logs = [];
        for (const log of this.programLogArray) {
            this._data.logs.push(log);
        }
        for (const log of this.projectLogArray) {
            this._data.logs.push(log);
        }
        this._data.logs.push(selfLearningLog);
        this._data.leaveType = this.leaveApplied;
        console.log('data:', this._data);
    }
    // generates trackerId for the current dailyTracker object to be created by combining email of user with current date in milliseconds
    generateTrackerId() {
        this._data.trackerId = localStorage.getItem('tgt_email') + "-" + (new Date()).getTime();
        console.log('trackerId formed inside generateTrackerId Method', this._data.trackerId);
    }
    generateDaysLogs(date) {
        const programs = this.getActivePrograms(date);
        const projects = this.getActiveProjects(date); // api call to project service to get active project list
        const dayLogs = [];
        const selfStudyLog = new Log(LogType.SELF_LEARNING, 0, 'SelfLearning', '', '');
        dayLogs.push(selfStudyLog);
        for (let i = 0; i < programs.length; i++) {
            const tempLog = new Log(LogType.PROGRAM, 0, programs[i].programName, programs[i].startDate, '');
            dayLogs.push(tempLog);
        }
        for (let i = 0; i < projects.length; i++) {
            const tempLog = new Log(LogType.PROJECT, 0, projects[i].projectName, projects[i].startDate, '');
            dayLogs.push(tempLog);
        }
        // API call to backend service to get and update the log hours is not made here yet. it is to be done. PENDING.
        return dayLogs;
    }
    getActivePrograms(date) {
        let output = [];
        this.progServ.getAllActiveProgramsOnParticularDate(localStorage.getItem('tgt_email'), date.getTime()).subscribe((result) => {
            console.log("inside generateDaysLogs method.Program list onAPI call is:", result);
            output = result;
        });
        return output;
    }
    getActiveProjects(date) {
        let output = [];
        this.progServ.getAllActiveProjectsOnParticularDate(localStorage.getItem('tgt_email'), date.getTime()).subscribe((result) => {
            console.log("inside generateDaysLogs method.Project list onAPI call is:", result);
            output = result;
        });
        return output;
    }
    isFulldayApplied() {
        console.log('leave status:', this.leaveApplied);
        if (this.leaveApplied == LeaveType.FULLDAY) {
            return true;
        }
        else {
            return false;
        }
    }
    createDailyTrackerForBackend() {
        let temp = new DailyTrackerModel(this._data.trackerId, this._data.date.getTime(), localStorage.getItem('tgt_email'), this._data.logs, this._data.leaveType, this._data.remarks); // date is converted to milliseconds with getTime()
        console.log("inside createDailyTrackerForBackend tracker object:", temp);
        return temp;
    }
};
TimeTrackerComponent = __decorate([
    Component({
        selector: 'app-time-tracker',
        templateUrl: './time-tracker.component.html',
        styleUrls: ['./time-tracker.component.css']
    }),
    __param(5, Inject(MAT_DIALOG_DATA))
], TimeTrackerComponent);
export { TimeTrackerComponent };
//# sourceMappingURL=time-tracker.component.js.map