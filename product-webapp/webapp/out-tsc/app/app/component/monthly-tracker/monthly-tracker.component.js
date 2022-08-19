import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
let MonthlyTrackerComponent = class MonthlyTrackerComponent {
    constructor(router, monthlyTrackerService, emailService) {
        this.router = router;
        this.monthlyTrackerService = monthlyTrackerService;
        this.emailService = emailService;
        this.allmonths = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.thisMonth = this.allmonths[(new Date().getMonth())];
        this.thisYear = new Date().getFullYear();
        this.yearFilter = new FormControl(new Date().getFullYear(), [Validators.min(2000), Validators.max(new Date().getFullYear())]);
        this.monthFilter = new FormControl(this.allmonths[new Date().getMonth() - 1]);
        // ALL RECORDS
        this.allTrackers = [];
    }
    // Overview Populate on View Initialization
    ngAfterViewInit() {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.updateRecords();
    }
    // Tab Change Event Handler
    tabChanged(tabChangeEvent) {
        if (tabChangeEvent.index === 0) {
            this.updateOverview(this.allTrackers);
        }
        else if (tabChangeEvent.index === 1) {
            this.updateOverview(this.submittedTrackers);
        }
        else if (tabChangeEvent.index === 2) {
            this.updateOverview(this.approvedTrackers);
        }
        else if (tabChangeEvent.index === 3) {
            this.updateOverview(this.revertedTrackers);
        }
    }
    // Long to Date String Convertor
    date(milliseconds) {
        return new Date(milliseconds).toDateString();
    }
    viewDetails(monthlyTracker) {
        this.router.navigate(['/home/calendar', monthlyTracker.employeeEmail, this.allmonths.indexOf(this.monthFilter.value) + 1, this.yearFilter.value]);
    }
    approve(monthlyTracker) {
        this.monthlyTrackerService
            .ApproveMonthlyTracker(monthlyTracker)
            .subscribe((Response) => {
            this.updateRecords();
        });
    }
    revert(monthlyTracker) {
        this.monthlyTrackerService
            .RevertMonthlyTracker(monthlyTracker)
            .subscribe((Response) => {
            this.updateRecords();
            this.emailService.revertMonthlyTracker(monthlyTracker).subscribe((response) => {
                if (response === "Email was Sent Successfully") {
                    console.log("Sent email to " + monthlyTracker.employeeEmail);
                }
            }, (error) => {
                console.log("Failed");
                console.log(error);
            });
        });
    }
    updateRecords() {
        this.thisMonth == this.allmonths[(new Date().getMonth())];
        this.thisYear = new Date().getFullYear();
        this.monthlyTrackerService.getAllMonthlyTrackers(this.monthFilter.value, this.yearFilter.value).subscribe((response) => {
            this.allTrackers = response;
            this.submittedTrackers = this.allTrackers.filter((s) => s.status === 'SUBMITTED');
            this.approvedTrackers = this.allTrackers.filter((s) => s.status === 'COMPLETED');
            this.revertedTrackers = this.allTrackers.filter((s) => s.status === 'REVERTED');
            if (this.tabGroup.selectedIndex === 0) {
                this.updateOverview(this.allTrackers);
            }
            else if (this.tabGroup.selectedIndex === 1) {
                this.updateOverview(this.submittedTrackers);
            }
            else if (this.tabGroup.selectedIndex === 2) {
                this.updateOverview(this.approvedTrackers);
            }
            else if (this.tabGroup.selectedIndex === 3) {
                this.updateOverview(this.revertedTrackers);
            }
            else {
                this.updateOverview(this.allTrackers);
            }
        });
    }
    updateOverview(monthlyTrackers) {
        this.records = monthlyTrackers.length;
        this.month = monthlyTrackers.reduce((s) => s).monthName.toLowerCase();
        this.year = monthlyTrackers.reduce((s) => s).year;
        this.startDate = monthlyTrackers[0].startDate;
        this.endDate = monthlyTrackers[0].endDate;
    }
};
__decorate([
    ViewChild('tabGroup')
], MonthlyTrackerComponent.prototype, "tabGroup", void 0);
MonthlyTrackerComponent = __decorate([
    Component({
        selector: 'app-monthly-tracker',
        templateUrl: './monthly-tracker.component.html',
        styleUrls: ['./monthly-tracker.component.css'],
    })
], MonthlyTrackerComponent);
export { MonthlyTrackerComponent };
//# sourceMappingURL=monthly-tracker.component.js.map