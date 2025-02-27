import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    @Inject(Actions) private actions$: Actions, 
    private authService: AuthService) {
      console.log('✅ AuthEffects initialized!');
    }

  login$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => console.log('AuthEffects received action:', action)),
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          tap(response => console.log('AuthService response:', response)),
          map(({ user }) => {
            if (user) {
              return AuthActions.loginSuccess({ user });
            } else {
              return AuthActions.loginFailure({ error: 'Invalid credentials' });
            }
          }),
          catchError((error) => {
            console.error(error); // Optional: log error for better debug visibility
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => localStorage.removeItem('authUser'))
      ),
    { dispatch: false }
  );
}