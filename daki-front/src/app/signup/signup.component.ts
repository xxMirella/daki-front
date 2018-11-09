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
    dob: '',
    cep: '',
    neighborhood: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    password: '',
    password_confirm: ''
  };

  constructor(
    private viacep: NgxViacepService,
    private authService: AuthService,
    private store: Store<AuthService>,
    private router: Router
  ) {}

  ngOnInit() {}

  validateCep() {
    this.viacep.buscarPorCep(this.newUser.cep).then(( endereco: Endereco ) => {
      this.newUser.neighborhood = endereco.bairro;
      this.newUser.city = endereco.localidade;
      this.newUser.state = endereco.uf;
     }).catch( (error: ErroCep) => {
       console.log(error.message);
     });
  }

  signUp() {
    console.log(this.newUser);

    this.authService.signup(
      this.newUser.name,
      this.newUser.dob,
      this.newUser.cep,
      this.newUser.neighborhood,
      this.newUser.city,
      this.newUser.state,
      this.newUser.phone,
      this.newUser.email,
      this.newUser.password
    ).subscribe((value: any) => {
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

      this.router.navigateByUrl('/');
    }, error => {
      console.log(error);
      console.log(error.error);

      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          alert('E-mail já existente');
        break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          alert('Muitas tentativas, tente novamente mais tarde');
        break;
        case 'WEAK_PASSWORD':
          alert('A senha deve ter no mínimo 6 caracteres');
        break;
        default:
          alert('Houve um erro');
        break;
      }
    });

  }
}
