import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private authorizeEndpoint = 'http://localhost:8084/oauth2/authorization/google';
  private tokenEndpoint = 'http://localhost:8084/login/oauth2/code/google';
  private tokenKey = 'token';
  constructor(private http: HttpClient) { }

  login(): void{
    window.open(this.authorizeEndpoint, '_self');
  }

  updateToken(token): void {
    localStorage.setItem(this.tokenKey, token);
  }

  fetchToken(code, state): Observable<any> {
    return this.http.get(this.tokenEndpoint + '?code=' + code + '&state=' + state);
  }

  getToken(): any {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): any {
    const token = this.getToken();
    return token != null;
  }

  // isLoggedInWithJwt() {
  //   const token = window.localStorage.getItem('tgt');
  //   return token != null;
  // }
}
