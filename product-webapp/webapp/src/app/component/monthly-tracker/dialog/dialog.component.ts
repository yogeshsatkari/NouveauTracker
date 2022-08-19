import { EmailService } from './../../../service/email.service';
import { MonthlyTrackerService } from './../../../service/monthly-tracker.service';
import { NgForm } from '@angular/forms';
import { MonthlyTracker } from './../../../model/monthly-tracker';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  emailId: string;
  id: string;

  showSpinner = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: MonthlyTracker,
    private monthlyTrackerService: MonthlyTrackerService,
    private matDialogRef: MatDialogRef<DialogComponent>,
    private emailService: EmailService
  ) {
    this.emailId = data.employeeEmail;
  }

  ngOnInit(): void {}
  onSubmit(form: NgForm): void {
    this.showSpinner = true;
    this.monthlyTrackerService
      .RemarkMonthlyTracker(
        this.data.monthlyTrackerId,
        form.control.get('remarks').value
      )
      .subscribe((response) => {
        this.data.remarks = form.control.get('remarks').value;
        this.monthlyTrackerService
          .RevertMonthlyTracker(this.data)
          .subscribe(() => {
            this.emailService.revertMonthlyTracker(this.data).subscribe(
              (response) => {
                if (response === 'Email was Sent Successfully') {
                  console.log('Sent email to ' + this.data.employeeEmail);
                  this.showSpinner = false;
                  this.matDialogRef.close();
                }
              },
              (error) => {
                console.log('Failed');
                console.log(error);
                this.showSpinner = false;
                this.matDialogRef.close();
              }
            );
          });
      });
  }
}
