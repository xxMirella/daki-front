import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SIGNUP_URL = 'http://localhost:4000/auth/signUp';
  private LOGIN_URL = 'http://localhost:4000/auth/login';
  private ACCOUNT_INFO_URL = '';

  constructor(
    private http: HttpClient
  ) { }

  signup(
    name: string,
    dob: string,
    cep: string,
    neighborhood: string,
    email: string,
    password: string
  ) {
    return this.http.post(this.SIGNUP_URL,
      {
        name: name,
        dob: dob,
        cep: cep,
        neighborhood: neighborhood,
        email: email,
        password: password
      });
  }

  login(email: string, password: string) {
    return this.http.post(this.LOGIN_URL, {
      email: email,
      password: password
    });
  }

  checkToken(idToken: string) {
    return this.http.post(this.ACCOUNT_INFO_URL, {
      idToken: idToken,
    });
  }
}
