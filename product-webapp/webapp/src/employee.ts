export class Employee {
  constructor(
    public emailId: string,
    public userName: string,
    public managerEmailId: string,
    public role: string,
    public profileImage: string
  ) {}
}
