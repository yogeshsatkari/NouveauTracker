export class Project {
  organisationName: string;
  organisationBrandLogo: string;
  projectCode: string;
  projectName: string;
  startDate: number;
  managerEmail: string;
  members: string[];
  createdOn:number;
  programStatus:string;
  endDate:number;

  constructor() {
    this.organisationName = '';
    this.organisationBrandLogo = 'https://source.unsplash.com/150x150/?logo';
    this.projectName = '';
    this.projectCode = '';
    this.startDate =0;
    this.managerEmail = '';
    this.members = [];
    this.createdOn=0
    this.programStatus="";
    this.endDate=0;
  }
}
