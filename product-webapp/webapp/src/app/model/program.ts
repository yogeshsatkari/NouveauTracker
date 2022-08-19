export enum ProgramType {
  IMMERSIVE = 'IMMERSIVE',
  WEEKEND = 'WEEKEND',
}

export class Program {
  organisationName: string;
  organisationBrandLogo: string;
  programType: ProgramType;
  programName: string;
  startDate: number;
  endDate: number;
  managerEmail: string;
  members: string[];
  createdOn:number;
  programStatus:string;

  constructor() {
    this.organisationName = '';
    this.organisationBrandLogo =
      'https://source.unsplash.com/150x150/?logo,fire';
    this.programType = ProgramType.IMMERSIVE;
    this.programName = '';
    this.startDate = 0;
    this.endDate = 0;
    this.managerEmail = '';
    this.members = [];
    this.createdOn=0;
    this.programStatus="";
  }
}
