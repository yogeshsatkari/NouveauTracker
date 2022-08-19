import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-consolidated-analytics',
  templateUrl: './consolidated-analytics.component.html',
  styleUrls: ['./consolidated-analytics.component.css']
})
export class ConsolidatedAnalyticsComponent implements OnInit {
pieChartHeader="dummyPieChart";
barChartHeader="dummyBarChart";

public barChartOptions={
  scaleShowVerticalLines:false,
  responsive:true
}

public pieChartLabels=["nitin","akhil","manan","yogesh"];
public pieChartData=[
  {data:[10,20,30,40]}
 
];
public pieChartLegend=true;
public pieChartType="pie";

public barChartLabels=["nitin","akhil","manan","yogesh"];
public barChartLegend=true;
public barChartData=[
  {data:[10,20,30,40],label:"maths"},
  {data:[40,20,100,50],label:"science"}
];
public barChartType="bar";
  constructor(@Inject(MAT_DIALOG_DATA)public _data:any) { }

  ngOnInit(): void {
    console.log("bar graph data recieved",this._data);
    this.barChartData=this._data.barChartData;
    this.barChartLabels=this._data.barChartLabels;
    this.pieChartLabels=this._data.pieChartLabels;
    this.pieChartData=this._data.pieChartData;
    this.barChartHeader=this._data.barChartHeader;
    this.pieChartHeader=this._data.pieChartHeader;
  }

}
