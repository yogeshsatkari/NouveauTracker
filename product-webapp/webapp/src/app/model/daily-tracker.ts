import { ListKeyManager } from '@angular/cdk/a11y';
import { Log } from './log';
export enum LeaveType {
  FULL_DAY = 'FULLDAY',
  HALF_DAY = 'HALF_DAY',
  NONE = 'NONE',
}
export class DailyTracker {
    trackerId = '';
    dayOfMonth: string;
    date: Date;
    employeeEmail: String = '';
    logs: Log[] = [];
    leaveType: LeaveType = LeaveType.NONE;
    remarks = '';
    state = false; // show whether the tracker is available for edit or not
    currentDay = false; // this attribute tells whther this daily tracker is current day of the calendar or not.it will always be false, except for 1 day when it matches the current calendar date
    leaveHours = 0;

    constructor(date: Date, state: boolean){
        this.state = state;
        this.date = date;
        if (this.state){this.dayOfMonth = String(this.date.getDate()); }
        else{this.dayOfMonth = ''; }
    

    }
  }

