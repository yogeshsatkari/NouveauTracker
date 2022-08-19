import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/service/program.service';
import { Chart} from '../../../../../node_modules/chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  public role: any;
  public programsArray = [];
  public doughnutChartLabel = [];
  public doughnutChartData = [];
  constructor(private programService: ProgramService) {}

  ngOnInit(): void {
    this.role = window.localStorage.getItem('role');
    this.getAllActivePrograms();
  }

  myChart(): void{
    const myChart = new Chart('myChart', {
      type: 'doughnut',
      data: {
          labels: this.doughnutChartLabel,
          datasets: [{
              label: 'No. of employees',
              data: this.doughnutChartData,
              backgroundColor: [
                'cornflowerblue',
                'olivedrab',
                'orange',
                'tomato',
                'crimson',
                'purple',
                'turquoise',
                'forestgreen',
                'navy',
                '#455a64',
                'rgba(255, 220, 129, 0.2)',
                'rgba(200, 181, 199, 0.2)',
                'rgba(193, 226, 206, 0.2)',
                'rgba(201, 193, 226, 0.2)',
                'rgba(175, 201, 195, 0.2)',
                'rgba(253, 222, 166, 0.2)',
                'rgba(216, 156, 218, 0.2)',
                'rgba(154, 215, 209, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(216, 181, 173, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(154, 198, 215, 0.2)',
                'rgba(208, 232, 191, 0.2)'
              ],
              // hoverOffset: 4,
              borderWidth: 1,
              borderColor: '#fff',
              hoverBorderWidth: 2,
              hoverBorderColor: '#fff'
          }]
      },
      options: {
        title: {
          display: true,
          text: 'Employee Distribution (Active Programs)',
          padding: 20,
          fontSize: 25,
        },
        legend: {
          position: 'right',                  // comment and show
          labels: {
            fontColor: '#000',
          }
        },
        layout: {
          padding: {
            left: 100
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
        this.programsArray = response;
        console.log(response);
        this.programsArray.forEach(program => {
          this.doughnutChartLabel.push(program.programName);
          this.doughnutChartData.push(program.membersList.length);
        });
        this.myChart();
      },
      error => {
        console.log(error);
      }
    );
  }
}
