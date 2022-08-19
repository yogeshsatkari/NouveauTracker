import { DialogComponent } from './dialog/dialog.component';
import { EmailService } from './../../service/email.service';
import { MonthlyTrackerService } from './../../service/monthly-tracker.service';
import { Router } from '@angular/router';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

export interface MonthlyTracker {
  monthlyTrackerId: string;
  employeeEmail: string;
  status: string;
  year: number;
  monthName: string;
  startDate: number;
  endDate: number;
  remarks: string;
}

@Component({
  selector: 'app-monthly-tracker',
  templateUrl: './monthly-tracker.component.html',
  styleUrls: ['./monthly-tracker.component.css'],
})
export class MonthlyTrackerComponent implements AfterViewInit {
  month: string;
  year: number;
  startDate: number;
  endDate: number;
  records: number;
  showSpinner = false;

  allmonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  thisMonth: string = this.allmonths[new Date().getMonth() - 1];
  thisYear: number = new Date().getFullYear();
  yearFilter = new FormControl(new Date().getFullYear(), [
    Validators.min(2000),
    Validators.max(new Date().getFullYear()),
  ]);
  monthFilter = new FormControl(this.allmonths[new Date().getMonth() - 1]);

  // Tabs
  @ViewChild('tabGroup') tabGroup: { selectedIndex: number };

  // ALL RECORDS
  allTrackers: MonthlyTracker[] = [];

  // SUBMITTED RECORDS
  submittedTrackers: MonthlyTracker[] = [];

  // APPROVED RECORDS
  approvedTrackers: MonthlyTracker[] = [];

  // REVERTED RECORDS
  revertedTrackers: MonthlyTracker[] = [];

  constructor(
    private router: Router,
    private monthlyTrackerService: MonthlyTrackerService,
    private emailService: EmailService,
    public dialog: MatDialog
  ) {}

  // Overview Populate on View Initialization
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.updateRecords();
  }

  // Tab Change Event Handler
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index === 0) {
      this.updateOverview(this.allTrackers);
    } else if (tabChangeEvent.index === 1) {
      this.updateOverview(this.submittedTrackers);
    } else if (tabChangeEvent.index === 2) {
      this.updateOverview(this.approvedTrackers);
    } else if (tabChangeEvent.index === 3) {
      this.updateOverview(this.revertedTrackers);
    }
  }

  // Long to Date String Convertor
  date(milliseconds: number): string {
    return new Date(milliseconds).toDateString();
  }

  viewDetails(monthlyTracker: MonthlyTracker): void {
    console.log("email:",monthlyTracker.employeeEmail,"month:",this.allmonths.indexOf(this.monthFilter.value) + 1,"year:",this.yearFilter.value)
    this.router.navigate([
      '/home/mtd',
      monthlyTracker.employeeEmail,
      this.allmonths.indexOf(this.monthFilter.value) + 1,
      this.yearFilter.value,
    ]);
  }
  approve(monthlyTracker: MonthlyTracker): void {
    this.monthlyTrackerService
      .ApproveMonthlyTracker(monthlyTracker)
      .subscribe((Response) => {
        this.updateRecords();
      });
  }
  revert(monthlyTracker: MonthlyTracker): void {
    this.openDialog(monthlyTracker);
    this.dialog.afterAllClosed.subscribe(() => {
      this.updateRecords();
    });
    this.updateRecords();
  }

  updateRecords(): void {
    this.thisMonth = this.allmonths[new Date().getMonth()];
    this.thisYear = new Date().getFullYear();
    this.showSpinner = true;
    this.monthlyTrackerService
      .getAllMonthlyTrackers(this.monthFilter.value, this.yearFilter.value)
      .subscribe(
        (response) => {
          this.allTrackers = response;
          this.showSpinner = false;
          this.submittedTrackers = this.allTrackers.filter(
            (s) => s.status === 'SUBMITTED'
          );
          this.approvedTrackers = this.allTrackers.filter(
            (s) => s.status === 'COMPLETED'
          );
          this.revertedTrackers = this.allTrackers.filter(
            (s) => s.status === 'REVERTED'
          );
          if (this.tabGroup.selectedIndex === 0) {
            this.updateOverview(this.allTrackers);
          } else if (this.tabGroup.selectedIndex === 1) {
            this.updateOverview(this.submittedTrackers);
          } else if (this.tabGroup.selectedIndex === 2) {
            this.updateOverview(this.approvedTrackers);
          } else if (this.tabGroup.selectedIndex === 3) {
            this.updateOverview(this.revertedTrackers);
          } else {
            this.updateOverview(this.allTrackers);
          }
        },
        (error) => {
          this.showSpinner = false;
        }
      );
  }

  updateOverview(monthlyTrackers: MonthlyTracker[]): void {
    this.records = monthlyTrackers.length;
    if (this.records === 0 && this.allTrackers.length === 0) {
      this.month = this.monthFilter.value;
      this.year = this.yearFilter.value;
      this.startDate = null;
      this.endDate = null;
    } else {
      this.month = monthlyTrackers.reduce((s) => s).monthName.toLowerCase();
      this.year = monthlyTrackers.reduce((s) => s).year;
      this.startDate = monthlyTrackers[0].startDate;
      this.endDate = monthlyTrackers[0].endDate;
    }
  }

  openDialog(monthlyTracker: MonthlyTracker): void {
    this.dialog.open(DialogComponent, {
      data: monthlyTracker,
    });
  }
}
