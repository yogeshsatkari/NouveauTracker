import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DailyTrackerService } from 'src/app/service/daily-tracker.service';
import { ProgramService } from 'src/app/service/program.service';

@Component({
  selector: 'app-bar-chart2',
  templateUrl: './bar-chart2.component.html',
  styleUrls: ['./bar-chart2.component.css']
})
export class BarChart2Component implements OnInit {

  public role: string;
  public loggedEmail: string;
  public projectsArray = [];
  public projectChartLabel: any;
  public projectChartData = [];
  public projectChartDataHours: any;
  constructor(private projectService: ProgramService,
              private dailyTrackerService: DailyTrackerService) {}

  ngOnInit(): void {
    this.role = window.localStorage.getItem('role');
    this.loggedEmail = window.localStorage.getItem('tgt_email');
    switch(this.role) {
      case 'OPERATIONS': {
        this.getAllprojectHours();
        break;
      }
      case 'MANAGER': {
        this.getAllProjectsHoursForManager();
        break;
      }
      case 'EMPLOYEE': {                      
        this.getAllProjectHoursByEmployee();
        break;
      }
    }
  }

  myChart(): void{
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: this.projectChartLabel,
          datasets: [{
              label: 'Number of employees',
              data: this.projectChartData,
              backgroundColor: 'lightpink',
              borderWidth: 1,
              borderColor: '#777',
              hoverBorderWidth: 1,
              hoverBorderColor: '#000'
            },
            {
              label: 'Total working hours',
              // data: this.projectChartData,
              data: this.projectChartDataHours,
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
          text: 'External projects (active)',
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

  getAllActiveprojects(): void {
    this.projectService.getAllActiveProjects('ACTIVE').subscribe(
      response => {
        console.log(response);
        this.projectsArray = response;
        this.projectChartLabel.forEach(labelName => {
          this.projectsArray.forEach(project => {
            if(labelName===project.projectName) {
                this.projectChartData.push(project.membersList.length);
            }
          })
        });
        this.myChart();
      },
      error => {
        console.log(error);
      }
    );
  }

  ///////////////////////////////////////////

  getAllprojectHours(): void {
    this.dailyTrackerService.getAllProjectHours().subscribe(
      response => {
        console.log("All project with hours");
        console.log(response);
        this.projectChartLabel = Object.keys(response);
        this.projectChartDataHours = Object.values(response);
        this.getAllActiveprojects();
        // this.myChart();
      },
      error => {
        console.log(error);
      }
    );
  }

  //////////////////////////////////////////////

  getAllProjectHoursByEmployee(): void {
    this.dailyTrackerService.getAllProjectHoursByEmployee(this.loggedEmail).subscribe(
      response => {
        console.log("All program with hours");
        console.log(response);
        this.projectChartLabel = Object.keys(response);
        this.projectChartDataHours = Object.values(response);
        this.getAllActiveprojects();
        // this.myChart();
      },
      error => {
        console.log(error);
      }
    );
  }

  
  //////////////////////////////////////////////

  getAllProjectsHoursForManager(): void {
    this.dailyTrackerService.getAllProjectsHoursForManager(this.loggedEmail).subscribe(
      response => {
        console.log("All projects with hours");
        console.log(response);
        this.projectChartLabel = Object.keys(response);
        this.projectChartDataHours = Object.values(response);
        this.getAllActiveprojects();
        // this.myChart();
      },
      error => {
        console.log(error);
      }
    );
  }
}
