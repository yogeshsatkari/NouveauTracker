import { MemberHour } from "./program-data";

export class ProjectData {
    organizationBrandLogo:string;
    projectName:string;
    organizationName:string;
    
    createdOn:number;
    startDate:number;
    endDate:number;
    managerEmailId:string;
    projectStatus:string;
    memberList:MemberHour[];
    totalHours:number;

    constructor(organizationBrandLogo:string,projectName:string,organizationName:string,createdOn:number,startDate:number,endDate:number,managerEmailId:string,projectStatus:string){
     this.organizationBrandLogo= organizationBrandLogo;
    this.projectName= projectName;
    this.organizationName= organizationName;
    this.createdOn=createdOn;
    this.startDate=startDate;
    this.endDate=endDate;
    this.managerEmailId=managerEmailId;
    this.projectStatus=projectStatus;
    this.memberList=[]
    this.totalHours=0;
    }
}

