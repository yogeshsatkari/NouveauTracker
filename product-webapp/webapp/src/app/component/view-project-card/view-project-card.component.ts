import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgramService } from 'src/app/service/program.service';

@Component({
  selector: 'app-view-project-card',
  templateUrl: './view-project-card.component.html',
  styleUrls: ['./view-project-card.component.css']
})
export class ViewProjectCardComponent implements OnInit {
  projectDetails: any;
  role: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private programService: ProgramService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.projectDetails = this.data;
    this.role = window.localStorage.getItem('role');
  }

  remove(projectName: string, memberEmail: string): void {

    this.programService.removeMembersFromProject(projectName, memberEmail).subscribe((response) => {
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
    }
    );
  }
}



