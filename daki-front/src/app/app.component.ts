import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from './store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Daki';
  loggedUser$: Observable<any>;

  constructor(
    private store: Store<AuthState>,
    private authService: AuthService,
  ) {
    this.loggedUser$ = store.select('auth').pipe(pluck('user'));

    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      authService.checkToken(userToken).subscribe((v: any) => {
        this.store.dispatch({
          type: 'SET_USER',
          payload: {
            user: {
              email: v.users[0].email,
              localId: v.users[0].localId,
            },
            token: userToken
          }
        });
      }, error => {
        localStorage.removeItem('userToken');
      });
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    this.store.dispatch({
      type: 'LOGOUT',
    });
  }
}
