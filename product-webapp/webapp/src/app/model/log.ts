export enum LogType {
  PROGRAM = 'PROGRAM',
  PROJECT = 'PROJECT',
  SELF_LEARNING = 'SELF_LEARNING',
}

export class Log {
  logType: LogType;
  logHours: number;
  taskName: string; // name of project or program
  startDate: number; // date on which program or project was started
  selfStudyDetails: string;

  constructor(
    logType: LogType,
    logHours: number,
    taskName: string,
    startDate:number,
    selfStudyDetails:string
  ) {
    this.logType = logType;
    this.logHours = logHours;
    this.taskName = taskName;
    this.startDate = startDate;
    this.selfStudyDetails = selfStudyDetails;
  }
}
