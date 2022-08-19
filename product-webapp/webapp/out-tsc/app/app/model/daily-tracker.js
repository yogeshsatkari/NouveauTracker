export var LeaveType;
(function (LeaveType) {
    LeaveType["FULLDAY"] = "FULLDAY";
    LeaveType["HALF_DAY"] = "HALF_DAY";
    LeaveType["NONE"] = "NONE";
})(LeaveType || (LeaveType = {}));
export class DailyTracker {
    constructor(date, state) {
        this.trackerId = '';
        this.employeeEmail = '';
        this.logs = [];
        this.leaveType = LeaveType.NONE;
        this.remarks = '';
        this.state = false; // show whether the tracker is available for edit or not
        this.currentDay = false; // this attribute tells whther this daily tracker is current day of the calendar or not.it will always be false, except for 1 day when it matches the current calendar date
        this.leaveHours = 0;
        this.state = state;
        this.date = date;
        if (this.state) {
            this.dayOfMonth = String(this.date.getDate());
        }
        else {
            this.dayOfMonth = '';
        }
        this.employeeEmail = localStorage.getItem('loginId');
    }
}
//# sourceMappingURL=daily-tracker.js.map