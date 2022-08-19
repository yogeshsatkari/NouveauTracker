import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../component/register-login/login-data';
import { RegisterData } from '../component/register-login/register-data';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  // userAuthenticationBaseUrl = 'https://nouveautracker.stackroute.io/authentication-service/api/v1/account';    // for register/login in mySql
  // userEmployeeServiceBaseUrl = 'https://nouveautracker.stackroute.io/employee-service/api/v1/employee';       // for updation of employee in mongoDB

  userAuthenticationBaseUrl = 'http://localhost:8080/authentication-service/api/v1/account';    // for register/login in mySql
  userEmployeeServiceBaseUrl = 'http://localhost:8080/employee-service/api/v1/employee';       // for updation of employee in mongoDB

  register(registerData: RegisterData): any {
    return this.httpClient.post<any>(this.userAuthenticationBaseUrl + '/register', registerData);
  }


  login(loginData: LoginData): any{
    return this.httpClient.post<any>(this.userAuthenticationBaseUrl + '/login', loginData);
  }

  getEmployee(emailId: string): any{
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.get<any>(this.userEmployeeServiceBaseUrl + '/employee?emailid=' + emailId, {headers: reqHeader});
  }

  getEmployeesByRole(role: string): any {
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.get<any>(this.userEmployeeServiceBaseUrl + '/byrole?role=' + role, {headers: reqHeader});
  }

  getEmployeesWorkingForAParticularManager(managerEmailId: string): any {
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.get<any>(
      this.userEmployeeServiceBaseUrl + '/bymanageremailid?manageremailid=' + managerEmailId,
      {headers: reqHeader});
  }

  public updateUserProfileImage(formData: FormData): any {
    const reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('tgt'));
    return this.httpClient.put<any>(
      this.userEmployeeServiceBaseUrl + '/profileimage', formData, {headers: reqHeader}).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }
  getAllEmployees(){
    return this.httpClient.get(this.userEmployeeServiceBaseUrl+"/employees");
  }

}
