import { createAction, props } from '@ngrx/store';
import { AuthUser } from './models/auth.models';

// Connexion
export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: AuthUser }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// Déconnexion
export const logout = createAction('[Auth] Logout');
