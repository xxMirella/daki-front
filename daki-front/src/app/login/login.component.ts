import { retryWhen, flatMap } from 'rxjs/operators';
import { Observable, interval, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
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
    store.select('auth').subscribe(() => {
      // console.log(value);
    });
  }

  ngOnInit() {
  }

  http_retry(maxRetry: number = 2, delayMs: number = 1000) {
    return (src: Observable<any>) => src.pipe(
      retryWhen(() => {
        return interval(delayMs).pipe(
          flatMap(count => count === maxRetry ? src : of(count))
        );
      })
    );
  }

  logIn() {
    // console.log(this.user.email, this.user.password);
    this.authService.login(this.user.email, this.user.password).pipe(this.http_retry()).subscribe((value: any) => {
      this.store.dispatch({
        type: 'SET_USER',
        payload: {
          token: value.TokenLogin.token,
          user: {
            localId: value.user[0]._id,
            name: value.user[0].name,
            email: value.user[0].email,
            profilePhoto: value.user[0].profilePhoto,
            birthDay: value.user[0].birthDay,
            district: value.user[0].district
          }
        }
      });
      localStorage.setItem('userToken', value.TokenLogin.token);
      this.router.navigateByUrl('posts').then();
    }, error => {
      // this.router.navigateByUrl('/error');
      console.log(error);
      alert(error.error.message);
    });
  }
}
