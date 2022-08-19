import { Status } from './status';

export class Project {
  constructor(
    public projectName: string,
    public organizationName: string,
    public startDate: string,
    public endDate: string,
    public status: Status,
    public managerEmailId: string,
    public members: string[],
    public image: string
  ) {}
}
