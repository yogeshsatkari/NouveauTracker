import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgramService } from '../../service/program.service';

@Component({
  selector: 'app-view-program-card',
  templateUrl: './view-program-card.component.html',
  styleUrls: ['./view-program-card.component.css'],
})
export class ViewProgramCardComponent implements OnInit {
  programDetails: any;
  role: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private programService: ProgramService, private snackBar: MatSnackBar) { }

  remove(programName: string, memberEmail: string): void {

    this.programService.removeMembersFromProgram(programName, memberEmail).subscribe((response) => {
      console.log(response);

      this.snackBar.open('Member Removed Successfully.', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }, (error) => {
      console.log(error);
      this.snackBar.open('Some problem occured.', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    });
  }

  ngOnInit(): void {
    this.programDetails = this.data;
    this.role = window.localStorage.getItem('role');
  }
}
