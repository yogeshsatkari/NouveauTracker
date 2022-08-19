import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TimeTrackerComponent } from '../time-tracker/time-tracker.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DailyTracker, LeaveType } from 'src/app/model/daily-tracker';
import { Program, ProgramType } from 'src/app/model/program';
import { Log, LogType } from 'src/app/model/log';
import { templateJitUrl } from '@angular/compiler';
import { DailyTrackerService } from 'src/app/service/daily-tracker.service';
import { DailyTrackerModel } from 'src/app/model/daily-tracker-model';
import { MissingTrackersComponent } from '../missing-trackers/missing-trackers.component';
import { MonthlyTrackerService } from 'src/app/service/monthly-tracker.service';
import { MonthlyTracker } from 'src/app/model/monthly-tracker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // all data variables
  trackerListMonth: DailyTracker[] = []; // list of DailyTracker objects for a month displayed
  daysInMonth = 0; // captures total number of days in a monmth being displayed
  firstDay = 0; // for capturing the weekday from which month starts
  month = 0; // use to create tracker object array for a month
  year = 0; // used to create tracked object array for a month
  employeeEmail = '';
  todaysDate = moment(); // keeps current date throughout the program
  date = moment(); // used to navigate and show different month tracker object in calendar
  desiredDate: Date = new Date(); // ngModel variable to pick date from nav calendar
  dailyTrackerForm: FormGroup;
  projectArray: Program[];
  programArray: Program[];
  firstDayOfMonth: Date;
  lastDayOfMonth: Date;
  mSD: number = 21;           //monthly submission date on which monthly tracker submit button gets active every month, set to 21st of every month currently
  monthlySubmissionActive: boolean = false;
  allMonths: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];//array to convert an index into month name
  allTrackersComplete:boolean; //used in monthlySubmission() to check if all logs are complete, to proceed with saving with api in backend
  mtToDate: moment.Moment;   //end date of monthly tracker report
  mtFromDate: moment.Moment;//start date of monthly tracker report
  monthlyTrackerMadeAlready: boolean;


  constructor(public _fb: FormBuilder, public dialog: MatDialog, private apiService: DailyTrackerService, private monthlyService: MonthlyTrackerService) {
    this.dailyTrackerForm = this._fb.group({
      calendarDays: this._fb.array([])
    });

  }

  // ON-INIT METHOD
  ngOnInit(): void {


    this.createMonthTrackers();
    this.checkIfMonthlySubmissionActive();


  }

  // method to load a picked month

  loadMonth() {
    this.date = moment(this.desiredDate);
    this.createMonthTrackers();
    this.checkIfMonthlySubmissionActive();
  }

  // method to Create DailyTracker objects for a month
  createMonthTrackers() {

    this.trackerListMonth = [];
    this.daysInMonth = moment(this.date).daysInMonth();
    this.firstDay = moment(this.date).startOf('M').weekday(); // gives weekday for first day of month in number e.g 5 for friday
    this.month = this.date.month() + 1; // month() returns 6 for July, we need to have 7 for july
    this.year = this.date.year();
    for (let j = 0; j < this.firstDay; j++)// loop to make state=false for inserting null trackers to shift first day of month to correct weekday in calendar
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
    this.getAllTrackersFromDB().subscribe((result: any) => {
      console.log("tracker for whole month from backend", result);
      let trackerListFromDB = result;
      for (let i = 0; i < trackerListFromDB.length; i++) {
        for (let j = 0; j < this.trackerListMonth.length; j++) {
          if (trackerListFromDB[i].date == this.trackerListMonth[j].date.getTime())// if dates match
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
  openDialog(tracker: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    console.log('data sent from calendar:', tracker);
    dialogConfig.data = tracker;
    const dialogRef = this.dialog.open(TimeTrackerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog result', result);
      // update the dailyTracker data for this Date
      for (const tracker of this.trackerListMonth) {
        if (result.logs.length > 0) {
          console.log("copying logs back to calendar");
          tracker.logs = result.logs;;
          console.log("tracker object after copying logs", tracker)
          break;
        }
      }
    });
  }
  // this Method sets attribut currentDay of a Daily Tracker object to TRUE
  showCurrentDay() {
    for (const tracker of this.trackerListMonth) {
      if (this.todaysDate.date() == tracker.date.getDate() && this.todaysDate.month() == tracker.date.getMonth() && this.todaysDate.year() == tracker.date.getFullYear()) { tracker.currentDay = true; }
      else { tracker.currentDay = false; }
    }
  }
  // methods to navigate and show next and previous months
  showNextMonth() {
    this.date.add(1, 'M');
    this.createMonthTrackers();
    this.checkIfMonthlySubmissionActive();
  }
  showPreviousMonth() {
    this.date.subtract(1, 'M');
    this.createMonthTrackers();
    this.checkIfMonthlySubmissionActive();

  }
  // this method identifies saturdays and sundays and sets them as holiday in calendar. this method is called through ngFor from HTML
  isWeekend(tracker: DailyTracker) {

    if (tracker.date.getDay() == 0 || tracker.date.getDay() == 6) {
      tracker.leaveType = LeaveType.NONE;
      tracker.state = false;
      return true;
    }
    else { return false; }
  }
  // this method disbales all future dates for editing
  isFutureDate(tracker: DailyTracker): boolean {
    const trackerMomemnt = moment(tracker.date);
    const currentMoment = moment(this.todaysDate);
    if (trackerMomemnt.isSameOrBefore(currentMoment)) {// if tracker date is earlier than current date
      return false;                                 // do not disable
    }
    else { return true; }                                  // disable
  }



  getTotalLoggedHours(tracker: DailyTracker): number {
    let sum = 0;
    for (const log of tracker.logs) {
      sum += log.logHours;
    }
    return sum;
  }
  getTotalLoggedHoursModel(tracker: DailyTrackerModel): number {
    let sum = 0;
    for (const log of tracker.logs) {
      sum += log.logHours;
    }
    return sum;
  }
  isFullDayLeave(tracker: DailyTracker) {
    if (tracker.leaveType == LeaveType.FULL_DAY) { return true; }
    else { return false; }
  }
  isHalfdayLeave(tracker: DailyTracker) {
    if (tracker.leaveType == LeaveType.HALF_DAY) { return true; }
    else { return false; }
  }
  monthlySubmission() {
    if (this.monthlySubmissionActive)//if monthlySubmission is ACTIVE i.e its true
    {
      //pass both dates as moment objects,check is all logs are present and filled for 8 hours
      this.checkTrackersLogStatus(this.mtFromDate, this.mtToDate);//returns boolean
      // console.log("boolean alltrackerscompleted:",this.allTrackersComplete);
      // if (this.allTrackersComplete)
      //  { //create a new monthly tracker ( either to save or to submit again)
      //   let newMonthlyId = localStorage.getItem('tgt_email') + "-" + this.allMonths[this.firstDayOfMonth.getMonth()] + "-" + this.firstDayOfMonth.getFullYear();
      //   var monthlyTracker = new MonthlyTracker(newMonthlyId, localStorage.getItem("tgt_email"), "SUBMITTED", this.firstDayOfMonth.getFullYear(), this.allMonths[this.firstDayOfMonth.getMonth()], this.mtFromDate.toDate().getTime(), this.mtToDate.toDate().getTime(), "");
       
      //   //if monthly tracker is already made, it was reverted, and now we are submitting it again
      //   if (this.monthlyTrackerMadeAlready) {
      //       console.log("ReSUBMITTING monthly tracker",monthlyTracker);
      //       this.monthlyService.SubmitMonthlyTracker(monthlyTracker).subscribe(res=>console.log("Result after Resubmitting MT:",res));
      //       this.monthlySubmissionActive=false;
      //   }
      //   else {
      //  //save fresh MT
      //  console.log("SAVING fresh monthly tracker",monthlyTracker);
      //  this.monthlyService.saveMonthlyTracker(monthlyTracker);
      //  this.monthlySubmissionActive=false;

      //   }
      // }
    }




  }
  //check whether 8 hour log for each day has been submitted for the month( 21st to 20th)
  //checks first if all daily trackers exist, then checks if 8 hours are logged or full day leave is logged
  checkTrackersLogStatus(fromDate: moment.Moment, toDate: moment.Moment){

    //get all trackers that exist between fromDate and toDate from backend
    var missingTrackerArray = [];
    var incompleteTrackerArray = [];
    this.apiService.getTrackersForPeriod(localStorage.getItem('tgt_email'), fromDate.toDate().getTime(), toDate.toDate().getTime()).subscribe(result => {
      console.log("trackers in given period are:", result);
      let iterator = moment(fromDate);


      while (iterator.isSameOrBefore(toDate)) {


        if (iterator.toDate().getDay() > 0 && iterator.toDate().getDay() < 6)//if its a weekday
        {
          
          if (!this.logExists(iterator.toDate().getTime(), result))//if the date does not exists in the trackerlist
          {
            
            missingTrackerArray.push(iterator.toDate());//push the Date into list of missing tracker dates array
          }
          else  //date exists in the trackerlist, then check if 8 hours have been logged(leave+log should=8)
          {
            if (!this.logHoursEquals8(iterator.toDate().getTime(), result)) {
              incompleteTrackerArray.push(iterator.toDate());
            }
          }
        }
        iterator.add(1, 'd');//increment iterator by 1 day
      }

      const dialogConf = new MatDialogConfig();
      dialogConf.data = { missing: missingTrackerArray, incomplete: incompleteTrackerArray };//
      this.dialog.open(MissingTrackersComponent, dialogConf);
      //if all trackers filled and logs complete
      if (incompleteTrackerArray.length == 0 && missingTrackerArray.length == 0) {
        console.log("inside if condition to return TRUE. inctrkarray:",incompleteTrackerArray,"length:",incompleteTrackerArray.length,"missingtrkarr:",missingTrackerArray,"length:",missingTrackerArray.length);
         this.allTrackersComplete=true;
       }
       else {
         this.allTrackersComplete= false;
       }
       //
       console.log("boolean alltrackerscompleted:",this.allTrackersComplete);
      if (this.allTrackersComplete)
       { //create a new monthly tracker ( either to save or to submit again)
        let newMonthlyId = localStorage.getItem('tgt_email') + "-" + this.allMonths[this.firstDayOfMonth.getMonth()] + "-" + this.firstDayOfMonth.getFullYear();
        var monthlyTracker = new MonthlyTracker(newMonthlyId, localStorage.getItem("tgt_email"), "SUBMITTED", this.firstDayOfMonth.getFullYear(), this.allMonths[this.firstDayOfMonth.getMonth()], this.mtFromDate.toDate().getTime(), this.mtToDate.toDate().getTime(), "");
       
        //if monthly tracker is already made, it was reverted, and now we are submitting it again
        if (this.monthlyTrackerMadeAlready) {
            console.log("ReSUBMITTING monthly tracker",monthlyTracker);
            this.monthlyService.SubmitMonthlyTracker(monthlyTracker).subscribe(res=>console.log("Result after Resubmitting MT:",res));
            this.monthlySubmissionActive=false;
        }
        else {
       //save fresh MT
       console.log("SAVING fresh monthly tracker",monthlyTracker);
       this.monthlyService.saveMonthlyTracker(monthlyTracker);
       this.monthlySubmissionActive=false;

        }
      }
    })
    
  }
  //method returns true if dailyTracker corresponding the date parameter exists in tracker array passed as parameter
  logExists(date: number, trackerList: any): boolean {
    for (var tracker of trackerList) {
      if (tracker.date == date) {
        return true;
      }
    }
    return false;//if date not found in trackerlist
  }

  //method takes a date and searches for dailyTracker in array for that date and return true if leave+log=8, returns false if leave+loghrs<8
  logHoursEquals8(date: number, trackerList: any): boolean {

    for (var tracker of trackerList) {
      if (tracker.date == date) {
        if (tracker.leaveHours + this.getTotalLoggedHoursModel(tracker) == 8) {
          console.log("Leave+log==8, actual sum:", tracker.leaveHours, this.getTotalLoggedHoursModel(tracker));
          return true;
        }

        else {
          console.log("Leave+log!=8, actual sum:", tracker.leaveHours, this.getTotalLoggedHoursModel(tracker))
          return false;
        }
      }
    }
  }
  //this methods sets variable monthlySubmissionActive as TRUE or FALSE on checking 3 conitions, date of submission, if Monthly tracker exists, if it exists, its status id REVERTED or anything else
  checkIfMonthlySubmissionActive() {
    //assuming monthly tracker is not made by default. condition check will make it true if its already existing in backend.
    this.monthlyTrackerMadeAlready = false;

    //reset to false every time a check is done
    this.monthlySubmissionActive = false;

    //make a date string get month & year from firstDayOfMonth(date) and date is 1day before monthly submission gets active +1 is required with getMonth() as it returns months from 0-11 jan-dec
    let toDateStr = (this.firstDayOfMonth.getMonth() + 1) + "-" + (this.mSD - 1) + "-" + this.firstDayOfMonth.getFullYear();

    this.mtToDate = moment(new Date(toDateStr));
    this.mtFromDate = moment(this.mtToDate);
    this.mtFromDate.subtract(1, 'M');
    this.mtFromDate.add(1, 'd');
    console.log("from:", this.mtFromDate.toDate(), "to:", this.mtToDate.toDate());

    //make a date string get month & year from firstDayOfMonth(date) and date is when monthly submission gets active , +1 is required with getMonth() as it returns months from 0-11 jan-dec
    let mSubDateStr = (this.firstDayOfMonth.getMonth() + 1) + "-" + (this.mSD) + "-" + this.firstDayOfMonth.getFullYear();
    
    let subDate = moment(new Date(mSubDateStr));
    if (this.todaysDate.isSameOrAfter(subDate))//if todays date is equal or has passed monthly submission date
    {
      let searchId = localStorage.getItem('tgt_email') + "-" + this.allMonths[this.firstDayOfMonth.getMonth()] + "-" + this.firstDayOfMonth.getFullYear();// create a monthly trackerId to search for in DB

      //check if monthly tracker already exists by searchin for ID of MT in DB
      this.monthlyService.findMonthlyTrackerById(searchId).subscribe((result: any) => {
        console.log("result for monthly trackerId",searchId," search:", result.data);
       
          if (result.monthlyTrackerId == searchId)//monthly tracker is found, then check its status
          {
            this.monthlyTrackerMadeAlready = true;
            if (result.status == "REVERTED") {
              console.log("this month tracker found with status REVERTED");
              this.monthlySubmissionActive = true;    //if reverted, activate button for submission again
            }
            else {
              console.log("this month tracker found with status not as REVERTED")
              this.monthlySubmissionActive = false;   //if any other status , deactivate button for submission
            }
          }
        // }

      },error=>{
        
          console.log("this month Monthly tracker not found(submission date has passed) error msg is:",error);
          this.monthlyTrackerMadeAlready = false;
          this.monthlySubmissionActive = true;// submission date has passed and monthly tracker is not created yet
        

      })

    }

  }
}
