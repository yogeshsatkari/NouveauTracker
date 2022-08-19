import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-missing-trackers',
  templateUrl: './missing-trackers.component.html',
  styleUrls: ['./missing-trackers.component.css']
})
export class MissingTrackersComponent implements OnInit {
  missingDayList:any;
  incompleteDayList:any;
  missingCount:number;
  incompleteCount:number;
  constructor(@Inject(MAT_DIALOG_DATA) public _data: any) {
    this.missingDayList=_data.missing;
    this.incompleteDayList=_data.incomplete;
    this.missingCount=_data.missing.length;
    this.incompleteCount=_data.incomplete.length
   }

  ngOnInit(): void {
console.log("DATA",this._data);
  }

}
