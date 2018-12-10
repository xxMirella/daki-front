import { retryWhen, flatMap } from 'rxjs/operators';
import { Observable, interval, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUser = {
    name: '',
    birthDay: '',
    email: '',
    password: '',
    phone: '',
    local: {
      cep: '',
      street: '',
      district: '',
      city: '',
      country: 'Brazil'
    }
  };

  stateInput: String = '';
  password_confirmInput: String = '';

  constructor(
    private viacep: NgxViacepService,
    private authService: AuthService,
    private store: Store<AuthService>,
    private router: Router
  ) {}

  ngOnInit() {}

  http_retry(maxRetry: number = 2, delayMs: number = 1000) {
    return (src: Observable<any>) =>
      src.pipe(
        retryWhen(_ => {
          return interval(delayMs).pipe(
            flatMap(count => (count === maxRetry ? src : of(count)))
          );
        })
      );
  }

  validateCep() {
    this.viacep
      .buscarPorCep(this.newUser.local.cep)
      .then((endereco: Endereco) => {
        this.newUser.local.street = endereco.logradouro;
        this.newUser.local.district = endereco.bairro;
        this.newUser.local.city = endereco.localidade;
        this.stateInput = endereco.uf;
      })
      .catch((error: ErroCep) => {
        console.log(error.message);
      });
  }

  signUp() {
    /*
      this.newUser.city,
      this.newUser.state,
      this.newUser.phone,
    */

    this.authService
      .signup(
        this.newUser.name,
        this.newUser.birthDay,
        this.newUser.email,
        this.newUser.password,
        this.newUser.phone,
        this.newUser.local.cep,
        this.newUser.local.street,
        this.newUser.local.district,
        this.newUser.local.city,
        this.newUser.local.country,
      )
      .pipe(this.http_retry())
      .subscribe(
        (value: any) => {
          console.log(value);
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
          },
          );
          localStorage.setItem('userToken', value.TokenLogin.token);

          this.router.navigateByUrl('/').then();
        },
        error => {
          // console.log(error);
          // console.log(error.error);
          alert(error.error.message);

        }
      );
  }
}
