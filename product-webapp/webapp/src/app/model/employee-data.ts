import { ProgramTime } from "./program-time";
import { ProjectTime } from "./project-time";

export class EmployeeData {
    image: string;
  email: string;
  name: string;
  projects:ProjectTime[];
  programs:ProgramTime[];
  totalProgHrs:number;
  totalProjHrs:number;
  self_Learning_Hrs:number;
  leaves:number;
  manager:string;
  fullDayLeavesList:number[]=[]
  halfDayLeavesList:number[]=[]

  constructor(image:string,email:string,name:string,projects:ProjectTime[],programs:ProgramTime[],totalProgHrs:number,totalProjHrs:number,self_Learning_Hrs:number,leaves:number,manager:string,fulldayLeaveList:number[],halfdayLeaveList:number[]){
    this.image=image;
    this.email=email;
    this.name=name;
    this.projects=projects;
    this.programs=programs;
    this.totalProgHrs=totalProgHrs;
    this.totalProjHrs=totalProjHrs;
    this.self_Learning_Hrs=self_Learning_Hrs;
    this.leaves=leaves;
    this.manager=manager;
    this.fullDayLeavesList=fulldayLeaveList;
    this.halfDayLeavesList=halfdayLeaveList;
  }
}
