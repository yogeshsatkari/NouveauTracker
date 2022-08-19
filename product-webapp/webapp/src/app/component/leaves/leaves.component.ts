import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
halfDayList:number[];
fullDayList:number[];
  constructor(@Inject(MAT_DIALOG_DATA)public _data:any) { }

  ngOnInit(): void {
    this.halfDayList=this._data.halfDayList;
    this.fullDayList=this._data.fullDayList;
    this.fullDayList.sort((a,b)=>a-b);
    this.halfDayList.sort((a,b)=>a-b);
    console.log("leave arrays in new comp,",this.halfDayList,this.fullDayList)

  }

}
