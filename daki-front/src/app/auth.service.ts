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
    birthDay: string,
    email: string,
    password: string,
    phone: string,
    cep: string,
    street: string,
    district: string,
    city: string,
    country: string,
  ) {
    return this.http.post(this.SIGNUP_URL,
      {
        name: name,
        birthDay: birthDay,
        email: email,
        password: password,
        phone: phone,
        local: {
          cep: cep,
          street: street,
          district: district,
          city: city,
          country: country
        }
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
