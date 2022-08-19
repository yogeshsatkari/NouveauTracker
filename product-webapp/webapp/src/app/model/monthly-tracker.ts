
export class MonthlyTracker {

    monthlyTrackerId: string;
    employeeEmail: string;
    status: string;
    year: number;
    monthName: string;
    startDate: number;
    endDate: number;
    remarks: string;
    
    constructor(id:string,email:string,status:string,year:number,month:string,startDate:number,endDate:number,remarks:string){
        this.monthlyTrackerId=id;
        this.employeeEmail=email;
        this.status=status;
        this.year=year;
        this.startDate=startDate;
        this.endDate=endDate;
        this.remarks=remarks;
        this.monthName=month;
    }
}
