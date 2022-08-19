import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DailyTracker, LeaveType } from 'src/app/model/daily-tracker';
import { DailyTrackerModel } from 'src/app/model/daily-tracker-model';
import { Log, LogType } from 'src/app/model/log';
import { Program, ProgramType } from 'src/app/model/program';
import { DailyTrackerService } from 'src/app/service/daily-tracker.service';
import { ProgramService } from 'src/app/service/program.service';
import { Project } from 'src/project';



import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css']
})
export class TimeTrackerComponent implements OnInit {
  currentDate: Date = new Date();
  date = '';

  hdStatus = 'NotApplied';
  leaves: LeaveType[] = [LeaveType.NONE, LeaveType.HALF_DAY, LeaveType.FULL_DAY];
  leaveApplied: LeaveType; // ng model variable to capture leave applied value
  programLogArray: Log[] = [];
  projectLogArray: Log[] = [];
  programArray: Program[] = [];
  projectArray: Project[] = [];
 
  dayLogs: Log[] = [];
  cardArray2: number[] = [1, 2, 3];
  cardArray3: number[] = [1];
  totalHoursOfDay = 0;
  centered = false;
  disabled = false;
  unbounded = false;
  radius = 200;
  color = '';
  logMsg = '';
  snackbarDurationSec = 5;
  tracker: DailyTracker;
  trackerCreated = false;

  dailyTracker: FormGroup;



  constructor(public dialogRef: MatDialogRef<TimeTrackerComponent>, public formBuilder: FormBuilder, private render: Renderer2, private elem: ElementRef, private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public _data: any, public trackerApi: DailyTrackerService, private progServ: ProgramService) {
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
      slDetails: new FormControl(slDetailsInit),
      slHours: new FormControl(slHourInit),   // initialize form input with data recieved from calendar Dailytracker object
      remarks: new FormControl(""),   // same as above

    });

  }
  ngOnInit(): void {
    console.log("data rcv from calendar ui in trackerUI:",this._data)
    // display data recieved from CALENDAR to DIALOG on console
   

    if (this._data.trackerId == '') {
      this.trackerCreated = true;
      console.log('creating a new trackerObject line 217 ');
      this.createFormArray_NewTracker();
    }
    else {
      this.trackerCreated = false;
      this.createFormArray_TrackerExists();
    }
    this.calTotalHoursOfDay();
    this.logMsg = this.totalHoursOfDay + ' hrs. logged.';
  }

  // this method returns true if Logged hours for day =8, else returns false
  totalHoursValid() {
    if (this.totalHoursOfDay == 8) { return true; }
    else { return false; }
  }


  get progTimeLogsArray(): FormArray {
    return this.dailyTracker.get('progTimeLogs') as FormArray;
  }
  get projTimeLogsArray(): FormArray {
    return this.dailyTracker.get('projTimeLogs') as FormArray;
  }
  // method to open snackbar incase hours logged <8 and user clicks SAVE
  openSnackbar() {
    this._snackBar.openFromComponent(SnackbarComponent, { duration: this.snackbarDurationSec * 1000 });
  }
  // method to generate formControls in each array program, project
  createFormArray_TrackerExists() {
    this.leaveApplied = this._data.leaveType;
    console.log("inside createFormArray_TrackerExists. _data.logs.length=", this._data.logs.length);
    for (let i = 0; i < this._data.logs.length; i++) {
      switch (this._data.logs[i].logType) {
        case LogType.PROJECT: console.log("project log created")
        this.projectLogArray.push(this._data.logs[i]); // add this log to projectlogarray
          this.projTimeLogsArray.push(new FormControl(this._data.logs[i].logHours));
          break;
        case LogType.PROGRAM:console.log("program log created")
           this.programLogArray.push(this._data.logs[i]); // add this log to programlogarray
          this.progTimeLogsArray.push(new FormControl(this._data.logs[i].logHours));
          break;
        case LogType.SELF_LEARNING: break;
        default: console.log('wrong log type found');
      }
    }
    console.log("project array filtered from calenderUI data:",this.projectLogArray);
    console.log("program array filtered from calenderUI data:",this.programLogArray);
  }
  createFormArray_NewTracker() {
    this.leaveApplied = LeaveType.NONE;
   
    this._data.logs = this.generateDaysLogs(this._data.date); // create log array for tracker object, by calling program/project api
    console.log("_datalogs,", this._data.logs, "data log length", this._data.logs.length);
    // for (let i = 0; i < this._data.logs.length; i++) {
    //   console.log("logtype126", this._data.logs[i].logType, "i=", i, "data log length", this._data.logs.length);
    //   switch (this._data.logs[i].logType) {

    //     case LogType.PROJECT: console.log("logtypeProject", this._data.logs[i].logType);
    //       this.projectLogArray.push(this._data.logs[i]); // add this log to projectlogarray
    //       this.projTimeLogsArray.push(new FormControl(this._data.logs[i].logHours));
    //       break;
    //     case LogType.PROGRAM: this.programLogArray.push(this._data.logs[i]); // add this log to programlogarray
    //       this.progTimeLogsArray.push(new FormControl(this._data.logs[i].logHours));
    //       break;
    //     case LogType.SELF_LEARNING: break;
    //     default: console.log('wrong log type found');
    //   }
    // }
    // console.log("_datalogs,", this._data);
    console.log("project array", this.projectLogArray);
  }
  // submit daily tracker
  submitDailyTracker(element1: HTMLElement, element2: HTMLElement) {
    
    this.calTotalHoursOfDay();
    console.log('total hours logged=', this.totalHoursOfDay);
    console.log(this.dailyTracker.value);
    this.updateLogData_LeaveStatus();   // update latest info from the form to send back to calendar. _data is updated
    if (this.leaveApplied == LeaveType.FULL_DAY) {
      this._data.logs = [];   // just before submission, check if FULLDAY leave is applied. If YES, send empty Log array to backend
    }
    if (this.totalHoursValid()) {
      console.log(this.dailyTracker.value);
      if (this.trackerCreated)    // if a new tracker is just created, call the SAVE api
      {
        this.generateTrackerId();
        this.trackerApi.saveTracker(this.createDailyTrackerForBackend()).subscribe((response) => console.log('response from save api from backend', response)); // api call to save the Daily tracker to backend
        this.dialogRef.close(this._data);
      }
      else                      // if its an existing tracker, call UPDATE api
      {
        this.trackerApi.updateTracker(this.createDailyTrackerForBackend()).subscribe(response => console.log('response from Update Api:', response));
        this.dialogRef.close(this._data);
      }
    }
    else {
      if (this.totalHoursOfDay > 8) {
        this.render.setStyle(element1, 'box-shadow', '0 0 5px red,0 0 7px rgb(237, 180, 180)');
        this.render.setStyle(element2, 'box-shadow', '0 0 5px red,0 0 7px rgb(237, 180, 180)');
        this.logMsg = this.totalHoursOfDay + ' hrs logged. Log Exact 8hrs pls.';
      }
      else {
        if (this.trackerCreated) {        // if a new tracker is just created, call the SAVE api
          this.generateTrackerId();
          this.trackerApi.saveTracker(this.createDailyTrackerForBackend()).subscribe((response) => console.log('response from save api from backend', response));
          this.openSnackbar();
          this.dialogRef.close(this._data);
        }
        else                      // if its an existing tracker, call UPDATE api
        {
          this.trackerApi.updateTracker(this.createDailyTrackerForBackend()).subscribe(response => console.log('response from Update Api:', response));
          this.dialogRef.close(this._data);
        }
      }
    }

  }

  calTotalHoursOfDay() {

    this.totalHoursOfDay = 0;
    let leaveHours = 0;
    switch (this.leaveApplied) {
      case LeaveType.NONE: leaveHours = 0;
        break;
      case LeaveType.HALF_DAY: leaveHours = 4;
        break;
      case LeaveType.FULL_DAY: leaveHours = 8;
        break;
      default: console.log('wrong leave type entered');
    }
    this.totalHoursOfDay += leaveHours;

    for (let i = 0; i < this.progTimeLogsArray.length; i++) {     // add prog log hours
      this.totalHoursOfDay += this.progTimeLogsArray.value[i];
    }

    for (let i = 0; i < this.projTimeLogsArray.length; i++) {     // add proj log hours
      this.totalHoursOfDay += this.projTimeLogsArray.value[i];
    }
    this.totalHoursOfDay += this.dailyTracker.get('slHours')?.value;  // add self learning hours

    console.log('at end of calculate method:', this.totalHoursOfDay);
  }



  closeDialogue() {
    this.dialogRef.close();
  }

  // method to create a dailytracker object that will be returned to calendar when dailyTracker is saved &closed

  updateLogData_LeaveStatus() {

    for (let i = 0; i < this.programLogArray.length; i++) {
      this.programLogArray[i].logHours = this.dailyTracker.get('progTimeLogs').value[i];
    }
    for (let i = 0; i < this.projectLogArray.length; i++) {
      this.projectLogArray[i].logHours = this.dailyTracker.get('projTimeLogs').value[i];
    }
    const selfLearningLog = new Log(LogType.SELF_LEARNING, this.dailyTracker.get('slHours')?.value, 'SelfLearning', 0, this.dailyTracker.get('slDetails')?.value);
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

  generateDaysLogs(date: Date): Log[] {
    this.getActivePrograms(date);// api call to program service to get active programs list
    this.getActiveProjects(date); // api call to project service to get active project list
    const selfStudyLog = new Log(LogType.SELF_LEARNING, 0, 'SelfLearning', 0, '');
    this.dayLogs.push(selfStudyLog);
    console.log("returning dayLogs fron generate method:", this.dayLogs);
    return this.dayLogs;
  }

  getActivePrograms(date: Date) {   // this method uses an API call to Program service to get active programs for this date

    this.progServ.getAllActiveProgramsOnParticularDate(localStorage.getItem('tgt_email'), date.getTime()).subscribe((result: any) => {
      console.log("inside generateDaysLogs method.Program list onAPI call is:", result);
    
      for (let i = 0; i < result.length; i++) {
        const tempLog = new Log(LogType.PROGRAM, 0, result[i].programName, result[i].startDate, '');
        this.dayLogs.push(tempLog);
        this.programLogArray.push(tempLog); // add this log to projectlogarray
        this.progTimeLogsArray.push(new FormControl(tempLog.logHours));
      }
    });

  }
  getActiveProjects(date: Date) {   // this method uses an API call to Project service to get active programs for this date

    this.progServ.getAllActiveProjectsOnParticularDate(localStorage.getItem('tgt_email'), date.getTime()).subscribe((result: any) => {
      console.log("inside generateDaysLogs method.Project list onAPI call is:", result);
      
      for (let i = 0; i < result.length; i++) {
        const tempLog = new Log(LogType.PROJECT, 0,result[i].projectName, result[i].startDate, '');
        

        this.dayLogs.push(tempLog);
        this.projectLogArray.push(tempLog); // add this log to projectlogarray
        this.projTimeLogsArray.push(new FormControl(tempLog.logHours));
      }
    });

  }
  isFulldayApplied() {
    console.log('leave status:', this.leaveApplied);
    if (this.leaveApplied == LeaveType.FULL_DAY) { return true; }
    else { return false; }
  }
  createDailyTrackerForBackend(): DailyTrackerModel {
    let temp = new DailyTrackerModel(this._data.trackerId, this._data.date.getTime(), localStorage.getItem('tgt_email'), this._data.logs, this._data.leaveType, this._data.remarks); // date is converted to milliseconds with getTime()
    console.log("inside createDailyTrackerForBackend tracker object:", temp);
    return temp;
  }
}
