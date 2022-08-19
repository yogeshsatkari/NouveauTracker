import { ListKeyManager } from '@angular/cdk/a11y';
import { ThrowStmt } from '@angular/compiler';
import { LeaveType } from './daily-tracker';
import { Log } from './log';

export class DailyTrackerModel {
    dailyTrackerID: string;
    date: number;
    employeeEmail: string;
    employeeName = 'not available in frontend';
    logs: Log[];
    leaveType: LeaveType;
    leaveHours: number;
    remarks: string;

    constructor(id: string, date: number, email: string, logs: Log[], leaveType: LeaveType, remarks: string){
        this.dailyTrackerID = id;
        this.date = date;
        this.employeeEmail = email;
        this.logs = logs;
        this.leaveType = leaveType;
        switch (this.leaveType){
            case LeaveType.NONE: this.leaveHours = 0;
                                 break;
            case LeaveType.HALF_DAY: this.leaveHours = 4;
                                     break;
            case LeaveType.FULL_DAY: this.leaveHours = 8;
                                    break;
            default: this.leaveHours = 100; // faulty input value
        }
        this.remarks = remarks;

    }


}
