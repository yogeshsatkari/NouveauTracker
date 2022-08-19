import { Status } from './status';

export class Program {
  res: any;
  constructor(
    public programName: string,
    public organizationName: string,
    public programType: string,
    public startDate: string,
    public endDate: string,
    public startTime: string,
    public endTime: string,
    public duration: string,
    public status: Status,
    public managerEmailId: string,
    public members: string[],
    public image: string
  ) {}
}
