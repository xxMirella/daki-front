import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private SIGNUP_URL = '';
  // private LOGIN_URL = '';
  // private ACCOUNT_INFO_URL = '';
  private SIGNUP_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyChwnkBncuwCAQqDjgjY3H7ocYfO2IPnCA';
  private LOGIN_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyChwnkBncuwCAQqDjgjY3H7ocYfO2IPnCA';
  private ACCOUNT_INFO_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyChwnkBncuwCAQqDjgjY3H7ocYfO2IPnCA';

  constructor(
    private http: HttpClient
  ) { }

  signup(
    name: string,
    dob: string,
    cep: string,
    neighborhood: string,
    city: string,
    state: string,
    phone: string,
    email: string,
    password: string
    ) {
      return this.http.post(this.SIGNUP_URL,
        {
          // name: name,
          // dob: dob,
          // cep: cep,
          // neighborhood: neighborhood,
          // city: city,
          // state: state,
          // phone: phone,
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
