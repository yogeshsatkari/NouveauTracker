export class ProgramData {
    organizationBrandLogo:string;
    programName:string;
    organizationName:string;
    programType:string;
    createdOn:number;
    startDate:number;
    endDate:number;
    managerEmailId:string;
    programStatus:string;
    memberList:MemberHour[];
    totalHours:number;

    constructor(organizationBrandLogo:string,programName:string,organizationName:string,programType:string,createdOn:number,startDate:number,endDate:number,managerEmailId:string,programStatus:string){
     this.organizationBrandLogo= organizationBrandLogo;
    this.programName= programName;
    this.organizationName= organizationName;
    this.programType=programType;
    this.createdOn=createdOn;
    this.startDate=startDate;
    this.endDate=endDate;
    this.managerEmailId=managerEmailId;
    this.programStatus=programStatus;
    this.memberList=[]
    this.totalHours=0;
    }
}
export class MemberHour{
    member:string;//emailid of employee working on the program
    hours: number;//total hours given to program by this employee
    constructor(member:string,hours:number){
        this.member=member;
        this.hours=hours;
    }
}
