import { LeaveType } from './daily-tracker';
export class DailyTrackerModel {
    constructor(id, date, email, logs, leaveType, remarks) {
        this.employeeName = 'not available in frontend';
        this.dailyTrackerID = id;
        this.date = date;
        this.employeeEmail = email;
        this.logs = logs;
        this.leaveType = leaveType;
        switch (this.leaveType) {
            case LeaveType.NONE:
                this.leaveHours = 0;
                break;
            case LeaveType.HALF_DAY:
                this.leaveHours = 4;
                break;
            case LeaveType.FULLDAY:
                this.leaveHours = 8;
                break;
            default: this.leaveHours = 100; // faulty input value
        }
        this.remarks = remarks;
    }
}
//# sourceMappingURL=daily-tracker-model.js.map