import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ProgramService } from 'src/app/service/program.service';
import { AddProgramMembersComponent } from '../add-program-members/add-program-members.component';
import { ViewProgramCardComponent } from '../view-program-card/view-program-card.component';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.css'],
})
export class ProgramCardComponent implements OnInit {

  role: string;
  imageURL: any;

  constructor(
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private programService: ProgramService
  ) {
    this.role = '';
  }


  @Input() public programData: any;

  showProgramDetails(programName: string): void {
    this.programService.getProgramDetails(programName).subscribe((response) => {
      this.dialog.open(ViewProgramCardComponent, {
        width: '600px',
        data: response,
      });
    });
  }

  addProgramMembers(event: any, programName: string): void {
    event.stopPropagation();
    this.dialog.open(AddProgramMembersComponent, {
      width: '600px',
      data: programName,
    });
    console.log('Add Members to ' + programName);
  }

  ngOnInit(): void {
    this.role = window.localStorage.getItem('role');

    this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + this.programData.organizationBrandLogo
    );

  }


}
