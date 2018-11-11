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

  logIn() {
    // console.log(this.user.email, this.user.password);
    this.authService.login(this.user.email, this.user.password).subscribe((value: any) => {
      this.store.dispatch({
        type: 'SET_USER',
        payload: {
          token: value.idToken,
          user: {
            email: value.email,
            localId: value.localId
          }
        }
      });
      localStorage.setItem('userToken', value.idToken);
      // console.log(value);
      this.router.navigateByUrl('/');
    }, error => {
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
