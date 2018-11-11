import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from './store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AuthState>,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
      map(v => {
        if (v.user == null) {
          this.router.navigateByUrl('/');
          return false;
        }

        return true;
      })
    );
  }
}
