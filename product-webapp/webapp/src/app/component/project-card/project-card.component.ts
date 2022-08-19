import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ProgramService } from 'src/app/service/program.service';
import { AddProjectMembersComponent } from '../add-project-members/add-project-members.component';
import { ViewProjectCardComponent } from '../view-project-card/view-project-card.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {

  role: string;
  imageURL: any;

  constructor(
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private programService: ProgramService
  ) {
    this.role = '';
  }

  @Input() public projectData: any;

  showProjectDetails(projectName: any): void {
    console.log(projectName);

    this.programService.getProjectDetails(projectName).subscribe((response) => {
      console.log(response);
      this.dialog.open(ViewProjectCardComponent, {
        width: '600px',
        data: response,
      });
    });
  }

  addProjectMembers(event: any, projectName: string): void {
    event.stopPropagation();
    this.dialog.open(AddProjectMembersComponent, {
      width: '600px',
      data: projectName,
    });
    console.log(projectName);
  }

  ngOnInit(): void {
    this.role = window.localStorage.getItem('role');

    this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + this.projectData.organizationBrandLogo
    );
  }
}
