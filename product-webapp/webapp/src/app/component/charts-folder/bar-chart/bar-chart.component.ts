import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DailyTrackerService } from 'src/app/service/daily-tracker.service';
import { ProgramService } from 'src/app/service/program.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public role: string;
  public loggedEmail: string;
  public programsArray = [];
  public programChartLabel: any;
  public programChartData = [];
  public programChartDataHours: any;
  constructor(private programService: ProgramService,
              private dailyTrackerService: DailyTrackerService) {}

  ngOnInit(): void {
    this.role = window.localStorage.getItem('role');
    this.loggedEmail = window.localStorage.getItem('tgt_email');
    switch(this.role) {
      case 'OPERATIONS': {
        // this.getAllActivePrograms();
        this.getAllProgramHours();
        break;
      }
      case 'MANAGER': {
        this.getAllProgramHoursByManagers();
        break;
      }
      case 'EMPLOYEE': {                      
        this.getAllProgramHoursByEmployee();
        break;
      }
    }
  }

  myChart(): void{
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: this.programChartLabel,
          datasets: [{
              label: 'Number of employees',
              data: this.programChartData,
              backgroundColor: 'lightpink',
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 1,
              hoverBorderColor: '#000'
            },
            {
              label: 'Total working hours',
              // data: this.programChartData,
              data: this.programChartDataHours,
              backgroundColor: 'cornflowerblue',
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 1,
              hoverBorderColor: '#000'
            }
          ]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        },
        // scaleShowVerticalLines: false,
        responsive: true,
        title: {
          display: true,
          text: 'External Programs (active)',
          padding: 20,
          fontSize: 22,
        },
        legend: {
          position: 'top',                  // comment and show
          labels: {
            fontColor: '#777',
            fontSize: 13
          }
        },
        layout: {
          padding: {
            left: 50
          }
        },
        tooltips: {
          displayColors: false
        }
      }
  });
  }

  getAllActivePrograms(): void {
    this.programService.getAllActivePrograms('ACTIVE').subscribe(
      response => {
        console.log(response);
        this.programsArray = response;
        this.programChartLabel.forEach(labelName => {
          this.programsArray.forEach(program => {
            if(labelName===program.programName) {
                this.programChartData.push(program.membersList.length);
            }
          })
        });
              this.myChart();                 // everything should load at once
      },
      error => {
        console.log(error);
      }
    );
  }

  //////////////////////////////////////////

  getAllProgramHours(): void {
    this.dailyTrackerService.getAllProgramHours().subscribe(
      response => {
        console.log("All program with hours");
        console.log(response);
        this.programChartLabel = Object.keys(response);
        this.programChartDataHours = Object.values(response);
        this.getAllActivePrograms();
        // this.myChart();
      },
      error => {
        console.log(error);
      }
    );
  }

//////////////////////////////////////////////

  getAllProgramHoursByEmployee(): void {
    this.dailyTrackerService.getAllProgramHoursByEmployee(this.loggedEmail).subscribe(
      response => {
        console.log("All program with hours");
        console.log(response);
        this.programChartLabel = Object.keys(response);
        this.programChartDataHours = Object.values(response);
        this.getAllActivePrograms();
        // this.myChart();
      },
      error => {
        console.log(error);
      }
    );
  }

//////////////////////////////////////////////

getAllProgramHoursByManagers(): void {
  this.dailyTrackerService.getAllProgramsHoursForManager(this.loggedEmail).subscribe(
    response => {
      console.log("All program with hours");
      console.log(response);
      this.programChartLabel = Object.keys(response);
      this.programChartDataHours = Object.values(response);
      this.getAllActivePrograms();
      // this.myChart();
    },
    error => {
      console.log(error);
    }
  );
}

}
