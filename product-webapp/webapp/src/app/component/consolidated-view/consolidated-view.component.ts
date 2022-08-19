import { T } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
// import * as XLSX from 'xlsx';
import { LeaveType } from 'src/app/model/daily-tracker';
import { DailyTrackerModel } from 'src/app/model/daily-tracker-model';
import { Employee } from 'src/app/model/employee';
import { EmployeeData } from 'src/app/model/employee-data';
import { LogType } from 'src/app/model/log';
import { Program } from 'src/app/model/program';
import { MemberHour, ProgramData } from 'src/app/model/program-data';
import { ProgramTime } from 'src/app/model/program-time';
import { Project } from 'src/app/model/project';
import { ProjectData } from 'src/app/model/project-data';
import { ProjectTime } from 'src/app/model/project-time';

// import { XLSX$Consts } from 'xlsx';
import { ConsolidatedAnalyticsComponent } from '../consolidated-analytics/consolidated-analytics.component';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { LeavesComponent } from '../leaves/leaves.component';
import { EmployeeService } from 'src/app/service/employee.service';
import { DailyTrackerService } from 'src/app/service/daily-tracker.service';
import { ProgramService} from 'src/app/service/program.service';
// import { FileSaverService } from 'ngx-filesaver';





@Component({
  selector: 'app-consolidated-view',
  templateUrl: './consolidated-view.component.html',
  styleUrls: ['./consolidated-view.component.css']
})
export class ConsolidatedViewComponent implements OnInit {
  //data objects for passing data from consolidated view to analytics view
  analyticsDataProg: any;
  analyticsDataProj: any;
  analyticsDataEmp: any;

  //variable to check checkbox status for yearly report
  yearlyReport: boolean = false;

  yearlyReportDownloaded:boolean=false;
  // array to hold each row of report(row=EmployeeData object)
  empData: EmployeeData[] = []

  //Array to hold List of all employees in company
  empList: Employee[];

  //Array to hold all dailytrackers for a month
  dailyTrackers: DailyTrackerModel[];
  dailyTrackersYear1: DailyTrackerModel[];//year variable for program report
  dailyTrackersYear2: DailyTrackerModel[];//year variable for project report

  //array to hold each row of Program report(row=ProgramData object)
  progData: ProgramData[] = [];
  projData: ProjectData[] = [];

  //array to hld list of all programs /projectfor the year selectedValueYearProg
  progList: any;
  projList: any;
  //array for name of columns in employee report
  displayedColumnsEmp: string[] = ['image', 'email', 'name', 'projectHrs', 'programHrs', 'self_Learning_Hrs', 'leaves', 'manager', 'projects-programs'];

  //array for name of columns in program report
  displayedColumnsProg: string[] = ['programName', 'programType', 'createdOn', 'startDate', 'endDate', 'organizationName', 'managerEmailId', 'memberList', 'totalHours', 'programStatus'];

  displayedColumnsProj: string[] = ['projectName', 'createdOn', 'startDate', 'endDate', 'managerEmailId', 'memberList', 'totalHours', 'projectStatus'];

  dataSourceEmp: any; //datasources for tables
  dataSourceProg: any;
  dataSourceProj: any;

  selectedValueYear: number = 2022;
  selectedValueYearProg: number = 2022;
  selectedValueYearProj: number = 2022;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years: number[] = [2018, 2019, 2020, 2021, 2022];
  selectedValueMonth: string = this.months[new Date().getMonth()];


  applyFilterEmp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEmp.filter = filterValue.trim().toLowerCase();
  }
  applyFilterProg(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProg.filter = filterValue.trim().toLowerCase();
  }
  applyFilterProj(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProj.filter = filterValue.trim().toLowerCase();
  }
  constructor( private dialog: MatDialog,private empService:EmployeeService,private dtService:DailyTrackerService,private progServ:ProgramService) { }

  ngOnInit(): void {

    this.fetchAllDailyTrackers();

  }

  //get all employees from db
  fetchAllEmployees() {
    this.empService.getAllEmployees().subscribe((result: any) => {
      console.log("all Employees:", result);
      this.empList = result;
      this.createEmployeeData();
    });
  }

  //get all daily tracker for a month and year
  fetchAllDailyTrackers() {
    //reset all 3 main arrays
    this.empData = [];
    this.empList = [];
    this.dailyTrackers = []
    let month: number = this.months.indexOf(this.selectedValueMonth);
    let year: number = this.selectedValueYear;
    if (this.yearlyReport)//if yearly report checkbox is checked, get trackers for the year
    {
      this.yearlyReportDownloaded=true;
      this.getDailyTrackersForYear(year);
    }
    else {
      this.yearlyReportDownloaded=false;
      this.dtService.getAllDailyTrackers(month, year).subscribe((res: any) => {
        console.log(res);
        this.dailyTrackers = res;
        this.fetchAllEmployees();
      });
    }
  }
  //get daily trackers for the year
  getDailyTrackersForYear(year: number) {
    let fromDateStr = "01/01/" + year;
    let toDateStr = "12/31/" + year;
    this.dtService.getDailyTrackersForPeriod(new Date(fromDateStr).getTime(), new Date(toDateStr).getTime()).subscribe((res: any) => {
      this.dailyTrackers = res;
      this.fetchAllEmployees();
    }
    );
  }
  //create Employee Data list , assigning all EmployeeData objects to Employee_List
  createEmployeeData() {
    for (var emp of this.empList)//for every employee
    {
      let totalProgHrs = 0;
      let totalProjHrs = 0;
      let self_Learning_Hrs = 0;
      let uniqueProgList: string[] = [];
      let uniqueProjList: string[] = [];
      let trackersOfThisEmp: DailyTrackerModel[] = []
      let leaves: number = 0;
      let fullDayLeaveList = [];
      let halfDayLeaveList = [];
      //iterate through all trackers in dailyTrackers list to find this employee's tracker
      for (var tracker of this.dailyTrackers) {
        if (tracker.employeeEmail == emp.emailId) {
          //add this tracker to list of this employee's daily tracker for future use in this loop
          trackersOfThisEmp.push(tracker);
          //capture leave status and add to leave variable 1 for fullday 0.5 for halfday
          if (tracker.leaveType == LeaveType.FULL_DAY) {
            let date = new Date(tracker.date);
            console.log(`FullDay Leave pushed for:`, date);
            fullDayLeaveList.push(tracker.date);
            leaves += 1;
          }
          else {
            if (tracker.leaveType == LeaveType.NONE) { }
            else{
              console.log(`HalfDay Leave pushed for:`, new Date(tracker.date));
              halfDayLeaveList.push(tracker.date);
              leaves += 0.5;
            }
          }
          for (var log of tracker.logs) {
            switch (log.logType) {
              case LogType.PROGRAM: console.log("program log for:", emp.employeeName, " Hours:", log.logHours);
                totalProgHrs += log.logHours;
                //check if this program already exists in uniqueProgList, if not, add it
                let found = false;
                for (let i = 0; i < uniqueProgList.length; i++) {
                  if (log.taskName == uniqueProgList[i]) {
                    found = true;
                  }
                }
                if (!found) {
                  uniqueProgList.push(log.taskName);//create unique list of programs
                }
                break;
              case LogType.PROJECT: console.log("project log for:", emp.employeeName, " Hours:", log.logHours);
                totalProjHrs += log.logHours;
                //check if this project already exists in uniqueProgList, if not, add it
                let found1 = false;
                for (let i = 0; i < uniqueProjList.length; i++) {
                  if (log.taskName == uniqueProjList[i]) {
                    found1 = true;
                  }
                }
                if (!found1) {
                  uniqueProjList.push(log.taskName);//create unique list of programs
                }
                break;
              case LogType.SELF_LEARNING: console.log("SelfLearning for:", emp.employeeName, " Hours:", log.logHours);
                self_Learning_Hrs += log.logHours;
                break;
              default: console.log("Wrong Log Type Found");
            }
          }
        }
      }
      let programs: ProgramTime[] = []
      for (var prog of uniqueProgList) {
        programs.push(new ProgramTime(prog, 0));//create objects with program name and loghours=0
      }
      let projects: ProjectTime[] = [];
      for (var proj of uniqueProjList) {
        projects.push(new ProjectTime(proj, 0));//create objects with program name and loghours=0
      }

      //with unique prog and proj list, iterate through the trackers again to get total hours for each prog/proj
      for (let tracker of trackersOfThisEmp) {
        for (var log of tracker.logs) {
          switch (log.logType) {
            case LogType.PROGRAM:// if its a program log, search programtime array for prog and add to its hours
              for (let i = 0; i < programs.length; i++) {
                if (log.taskName == programs[i].program) {
                  programs[i].time += log.logHours;
                }
              }
              break;
            case LogType.PROJECT:// if its a program log, search programtime array for prog and add to its hours
              for (let i = 0; i < projects.length; i++) {
                if (log.taskName == projects[i].project) {
                  projects[i].time += log.logHours;
                }
              }
              break;
            case LogType.SELF_LEARNING:
            default:
          }
        }
      }
      //create EmployeeData object and push to empData array FINAL OUTPUT IN REPORT
      this.empData.push(new EmployeeData(emp.profileImage, emp.emailId, emp.employeeName, projects, programs, totalProgHrs, totalProjHrs, self_Learning_Hrs, leaves, emp.managerEmailId, fullDayLeaveList, halfDayLeaveList));
    }
    console.log("hello", this.empData);
    this.dataSourceEmp = new MatTableDataSource(this.empData);
    this.fetchAllPrograms();
    this.fetchAllProjects();
  }
  //gets all active/inactive projects from backend
  fetchAllProjects() {
    this.projList = [];
    this.dailyTrackersYear2 = [];
    this.projData = [];
    this.progServ.getAllProjects().subscribe((res: any) => {
      console.log("All Projects from backend:", res);
      this.projList = this.getProjectsForTheYear(res, this.selectedValueYearProj);
      for (var project of this.projList) {
        this.projData.push(new ProjectData(project.organizationBrandLogo, project.projectName, project.organizationName, project.createdOn, project.startDate, project.endDate, project.managerEmailId, project.projectStatus));//member list and total hours are optional parameters and will be calculated in following code
      }
      console.log("project data objects:", this.projData);
      this.createProjectData();
    })

  }
  //gets all active/inactive programs from backend
  fetchAllPrograms() {
    this.progList = [];
    this.dailyTrackersYear1 = [];
    this.progData = [];
    this.progServ.getAllPrograms().subscribe((res: any) => {
      console.log("All Programs from backend:", res);
      this.progList = this.getProgramsForTheYear(res, this.selectedValueYearProg);
      for (var program of this.progList) {
        this.progData.push(new ProgramData(program.organizationBrandLogo, program.programName, program.organizationName, program.programType, program.createdOn, program.startDate, program.endDate, program.managerEmail, program.programStatus));//member list and total hours are optional parameters and will be calculated in following code
      }
      console.log("program data objects:", this.progData);
      this.createProgramData();
    })
  }

  //creates ProgramData object for each program in progList
  createProgramData() {
    let yearStart = new Date("01/01/" + this.selectedValueYearProg).getTime();
    let yearEnd = new Date("12/31/" + this.selectedValueYearProg).getTime();
    this.dtService.getDailyTrackersForPeriod(yearStart, yearEnd).subscribe((result: any) => {
      console.table(result);
      this.dailyTrackersYear1 = result;
      for (var tracker of this.dailyTrackersYear1) {
        for (var log of tracker.logs) {
          if (log.logType == LogType.PROGRAM) {
            for (let i = 0; i < this.progData.length; i++) {
              if (this.progData[i].programName == log.taskName) {
                this.progData[i].totalHours += log.logHours;//add loghours to that program's total hours
                //check if this employee exists in member list of that program, if not add him with hours, if yes, then add hours against that employee for that program
                let memberFound = false;
                for (let j = 0; j < this.progData[i].memberList.length; j++) {
                  if (this.progData[i].memberList[j].member == tracker.employeeEmail) {
                    memberFound = true;
                    this.progData[i].memberList[j].hours += log.logHours;//if member found, add the loghours for him
                  }
                }
                if (!memberFound) {
                  this.progData[i].memberList.push(new MemberHour(tracker.employeeEmail, log.logHours));//push a new member hour entry to members array of that program  
                }
              }
            }
          }
        }
      }
      console.log("Final ProgramData obj for report:", this.progData);
      this.dataSourceProg = new MatTableDataSource(this.progData);
    });

  }

  createProjectData() {
    let yearStart = new Date("01/01/" + this.selectedValueYearProj).getTime();
    let yearEnd = new Date("12/31/" + this.selectedValueYearProj).getTime();
    this.dtService.getDailyTrackersForPeriod(yearStart, yearEnd).subscribe((result: any) => {
      console.table(result);
      this.dailyTrackersYear2 = result;
      for (var tracker of this.dailyTrackersYear2) {
        for (var log of tracker.logs) {
          if (log.logType == LogType.PROJECT) {
            for (let i = 0; i < this.projData.length; i++) {
              if (this.projData[i].projectName == log.taskName) {
                this.projData[i].totalHours += log.logHours;//add loghours to that program's total hours
                //check if this employee exists in member list of that program, if not add him with hours, if yes, then add hours against that employee for that program
                let memberFound = false;
                for (let j = 0; j < this.projData[i].memberList.length; j++) {
                  if (this.projData[i].memberList[j].member == tracker.employeeEmail) {
                    memberFound = true;
                    this.projData[i].memberList[j].hours += log.logHours;//if member found, add the loghours for him
                  }
                }
                if (!memberFound) {
                  this.projData[i].memberList.push(new MemberHour(tracker.employeeEmail, log.logHours));//push a new member hour entry to members array of that program  
                }
              }
            }
          }
        }
      }
      console.log("Final projectData objects:", this.projData);
      this.dataSourceProj = new MatTableDataSource(this.projData);
    });

  }

  getProgramsForTheYear(list: Program[], year: number): Program[] {
    let result = [];
    let yearStart = new Date("01/01/" + year).getTime();
    let yearEnd = new Date("12/31/" + year).getTime();

    for (var prog of list) {
      if (prog.createdOn >= yearStart && prog.createdOn <= yearEnd) {
        result.push(prog);
      }
    }
    console.log("inside get programsfor the year method, for year", year, "programs are", result)
    return result;
  }

  getProjectsForTheYear(list: Project[], year: number): Project[] {
    let result = [];
    let yearStart = new Date("01/01/" + year).getTime();
    let yearEnd = new Date("12/31/" + year).getTime();

    for (var proj of list) {
      if (proj.createdOn >= yearStart && proj.createdOn <= yearEnd) {
        result.push(proj);
      }
    }
    console.log("inside get projects for the year method, for year", year, "programs are", result)
    return result;
  }

  //open analytics
  openAnalyticsProg() {
    //data for barchart/pieChart
    let progName = [];
    let progHours = [];
    let employeeOnProgram = [];
    for (var prog of this.progData) {
      progName.push(prog.programName);
      progHours.push(prog.totalHours);
      employeeOnProgram.push(prog.memberList.length);
    }


    this.analyticsDataProg = {
      barChartLabels: progName,
      barChartData: [{ data: progHours, label: "Total Billed Hours" }],
      barChartHeader: "Program Hour Comaprison",
      pieChartLabels: progName,
      pieChartData: [{ data: employeeOnProgram }],
      pieChartHeader: "TeamSize Comparison"
    }
    let dialogConf = new MatDialogConfig();
    dialogConf.data = this.analyticsDataProg;
    this.dialog.open(ConsolidatedAnalyticsComponent, dialogConf);
  }
  openAnalyticsEmp() {
    //data for barchart
    let empName = [];
    let progHrs = [];
    let projHrs = [];
    let slHrs = [];
    for (var empObj of this.empData) {
      empName.push(empObj.name);
      progHrs.push(empObj.totalProgHrs);
      projHrs.push(empObj.totalProjHrs);
      slHrs.push(empObj.self_Learning_Hrs);
    }
    //data for pie chart, show hour distribution of all employees of comapny among program, project, selflearning
    let compProgHr = 0, compProjHr = 0, compSelfLearnHr = 0;
    for (var empObj of this.empData) {
      compProgHr += empObj.totalProgHrs;
      compProjHr += empObj.totalProjHrs;
      compSelfLearnHr += empObj.self_Learning_Hrs;
    }


    this.analyticsDataEmp = {
      barChartLabels: empName,
      barChartData: [
        { data: progHrs, label: "Program Hrs" },
        { data: projHrs, label: "Project Hrs" },
        { data: slHrs, label: "SelfStudy Hrs" },
      ],
      pieChartLabels: ["Program Hrs", "Project Hrs", "Self Learning Hrs"],
      pieChartData: [{ data: [compProgHr, compProjHr, compSelfLearnHr] }],
      barChartHeader: "Employee Hours Distribution",
      pieChartHeader: "Total Billable Hours Distr."

    }
    let dialogConf = new MatDialogConfig();
    dialogConf.data = this.analyticsDataEmp;
    this.dialog.open(ConsolidatedAnalyticsComponent, dialogConf);
  }
  openAnalyticsProj() {
    let projName = [];
    let projHours = [];
    let employeeOnProject = [];
    for (var proj of this.projData) {
      projName.push(proj.projectName);
      projHours.push(proj.totalHours);
      employeeOnProject.push(proj.memberList.length);
    }


    this.analyticsDataProj = {
      barChartLabels: projName,
      barChartData: [{ data: projHours, label: "Total Billed Hours" }],
      barChartHeader: "Project Hour Comaprison",
      pieChartLabels: projName,
      pieChartData: [{ data: employeeOnProject }],
      pieChartHeader: "TeamSize Comparison"
    }
    let dialogConf = new MatDialogConfig();
    dialogConf.data = this.analyticsDataProj;
    this.dialog.open(ConsolidatedAnalyticsComponent, dialogConf);
  }

  //employee report excel download
  downloadEmpReport() {

    // let element=document.getElementById("employeeTable");
    let reportObj = [];
    for (var emp of this.empData) {
      reportObj.push({
        name: emp.name, email: emp.email, projectHours: emp.totalProgHrs, programHrs: emp.totalProgHrs, selfLearningHours: emp.self_Learning_Hrs, manager: emp.manager, leaves: emp.leaves
      });
    }
    let _title;
    if(this.yearlyReportDownloaded){
_title="year"+this.selectedValueYear;
    }
    else{
      _title=this.selectedValueMonth;
    }
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'EmployeeReport:'+_title,
      useBom: true,
      noDownload: false,
      headers: ["Name", "Email", "Project Hours", "Program Hours", "Self Learning Hours", "Manager", "Leaves(Days)"]
    };
    console.log("reportObj:", reportObj);
    new ngxCsv(reportObj, 'EmployeeReport:' + _title, options)

  }

  //show leave details in a modal
  showLeaves(empDataObj: EmployeeData) {
    let dialogConf = new MatDialogConfig();
    dialogConf.data = {
      fullDayList: empDataObj.fullDayLeavesList,
      halfDayList: empDataObj.halfDayLeavesList
    };
    this.dialog.open(LeavesComponent, dialogConf)
    console.log("leave list for:", empDataObj.name, empDataObj.fullDayLeavesList, empDataObj.halfDayLeavesList);
  }

  downloadProjReport() {

    // let element=document.getElementById("employeeTable");
    let reportObj = [];
    for (var proj of this.projData) {
      reportObj.push({
        projectName:proj.projectName,createdOn: new Date(proj.createdOn),startDate:new Date(proj.startDate), endDate: new Date(proj.endDate),managerEmailId:proj.managerEmailId, totalHours:proj.totalHours,projectStatus:proj.projectStatus,
      });
    }
    
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'ProjectsReport:'+this.selectedValueYearProj,
      useBom: true,
      noDownload: false,
      headers: ["ProjectName", "CreatedOn", "StartDate", "EndDate", "Manager", "TotalBilledHours", "ProjectStatus"]
    };
    console.log("reportObj:", reportObj);
    new ngxCsv(reportObj, 'ProjectReport:' + this.selectedValueYearProj, options)

  }
  
  
  downloadProgReport() {

    // let element=document.getElementById("employeeTable");
    let reportObj = [];
    for (var prog of this.progData) {
      reportObj.push({
        programName:prog.programName,createdOn: new Date(prog.createdOn),startDate:new Date(prog.startDate), endDate: new Date(prog.endDate),managerEmailId:prog.managerEmailId, totalHours:prog.totalHours,projectStatus:prog.programStatus,organizationName:prog.organizationName,programType:prog.programType
      });
    }
    
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'ProgramReport:'+this.selectedValueYearProg,
      useBom: true,
      noDownload: false,
      headers: ["ProjectName", "CreatedOn", "StartDate", "EndDate", "Manager", "TotalBilledHours", "ProjectStatus","OrganizationName","ProgramType"]
    };
    console.log("reportObj:", reportObj);
    new ngxCsv(reportObj, 'ProgramReport:' + this.selectedValueYearProg, options)

  }
}
