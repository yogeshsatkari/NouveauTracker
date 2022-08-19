export var LogType;
(function (LogType) {
    LogType["PROGRAM"] = "PROGRAM";
    LogType["PROJECT"] = "PROJECT";
    LogType["SELF_LEARNING"] = "SELF_LEARNING";
})(LogType || (LogType = {}));
export class Log {
    constructor(logType, logHours, taskName, startDate, selfStudyDetails) {
        this.logType = logType;
        this.logHours = logHours;
        this.taskName = taskName;
        this.startDate = startDate;
        this.selfStudyDetails = selfStudyDetails;
    }
}
//# sourceMappingURL=log.js.map