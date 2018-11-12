import { retryWhen, flatMap } from 'rxjs/operators';
import { Observable, interval, throwError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private store: Store<AuthService>,
    private router: Router
  ) {
    store.select('auth').subscribe((value) => {
      // console.log(value);
    });
  }

  ngOnInit() {
  }

  http_retry(maxRetry: number = 2, delayMs: number = 1000) {
    return (src: Observable<any>) => src.pipe(
      retryWhen(_ => {
        return interval(delayMs).pipe(
          flatMap(count => count == maxRetry ? src : of(count))
        );
      })
    );
  }

  logIn() {
    // console.log(this.user.email, this.user.password);
    this.authService.login(this.user.email, this.user.password).pipe(this.http_retry()).subscribe((value: any) => {
      // console.log(value);
      this.store.dispatch({
        type: 'SET_USER',
        payload: {
          token: value.TokenLogin.token,
          user: {
            localId: value.response._id,
            name: value.response.name,
            email: value.response.email,
            profilePhoto: value.response.profilePhoto,
            birthDay: value.response.birthDay,
            district: value.response.district
          }
        }
      });
      localStorage.setItem('userToken', value.TokenLogin.token);
      // console.log(value);
      this.router.navigateByUrl('/');
    }, error => {
      // this.router.navigateByUrl('/error');
      console.log(error);
      console.log(error.error);

      switch (error.error.error.message) {
        case 'INVALID_PASSWORD':
          alert('Senha inválida');
        break;
        case 'EMAIL_NOT_FOUND':
          alert('E-mail inválido');
        break;
        case 'USER_DISABLED':
          alert('E-mail inválido');
        break;
        default:
          alert('Houve um erro');
        break;
      }
    });
  }
}
