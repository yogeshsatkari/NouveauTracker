import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-charts',
  templateUrl: './all-charts.component.html',
  styleUrls: ['./all-charts.component.css']
})
export class AllChartsComponent implements OnInit {

  public role: any;
  constructor() { }

  ngOnInit(): void {
    this.role = window.localStorage.getItem('role');
  }

}
