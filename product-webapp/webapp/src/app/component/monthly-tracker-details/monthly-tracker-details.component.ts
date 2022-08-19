import { MonthlyTrackerService } from './../../service/monthly-tracker.service';
import { DailyTracker } from './../../model/daily-tracker';
import { AfterViewInit, Component, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { DailyTrackerService } from "src/app/service/daily-tracker.service";
import { MonthlyTracker } from 'src/app/model/monthly-tracker';


@Component({
  selector: 'app-monthly-tracker-details',
  templateUrl: './monthly-tracker-details.component.html',
  styleUrls: ['./monthly-tracker-details.component.css'],

})
export class MonthlyTrackerDetailsComponent implements AfterViewInit {
  email:string;
  month:string;
  year:string;
  employeeName:string='Muthu';
  dailyTrackers:DailyTracker[]=[]
  monthlyTracker:MonthlyTracker;
  constructor(private apiService: MonthlyTrackerService,private api2:DailyTrackerService, private route: ActivatedRoute,public dialog: MatDialog) { 
    // for (let index = moment().add(10, 'days'); index < moment().add(30, 'days'); index=moment(index).add(1, 'days')) {
    //   this.dates.push(index.toDate().toDateString())
    // }
    
  }
  ngAfterViewInit(): void {

    this.email = this.route.snapshot.params['email'];
    this.month = this.route.snapshot.params['month'];
    this.year = this.route.snapshot.params['year']; 
    this.apiService.findMonthlyTrackerById(this.email+"-"+this.month+"-"+this.year).subscribe(response=>{
      this.monthlyTracker=response;
      this.api2.getTrackersForPeriod(this.email,this.monthlyTracker.startDate,this.monthlyTracker.endDate).subscribe(response=>{
        this.dailyTrackers=response;        
        this.dailyTrackers.forEach(dailyTracker=>{
          dailyTracker.logs.forEach(log=>log.taskName)

        })
      })
    });
  }

  getDateString(item:DailyTracker){
    return moment(item.date).toDate().toDateString();
  }
  openDialog(dailyTracker:DailyTracker) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      data:dailyTracker
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogContentExampleDialog {
  projects:{ name: string; hours: number; }[]=[];
  selflearnings:{ name: string; hours: number; }[]=[];
  programs:{ name: string; hours: number; }[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) public dailyTracker: DailyTracker,private dailog:MatDialog){
    dailyTracker.logs.filter(log=>log.logType==="PROGRAM").forEach(log=>{
      this.programs.push({name:log.taskName,hours:log.logHours});
    });
    dailyTracker.logs.filter(log=>log.logType==="PROJECT").forEach(log=>{
      this.projects.push({name:log.taskName,hours:log.logHours});
    });
    dailyTracker.logs.filter(log=>log.logType==="SELF_LEARNING").forEach(log=>{
      this.selflearnings.push({name:log.taskName,hours:log.logHours});
    });
  }
  getDateString(item:DailyTracker){
    return moment(item.date).toDate().toDateString();
  }
  close(){
  this.dailog.closeAll();
  }
}
