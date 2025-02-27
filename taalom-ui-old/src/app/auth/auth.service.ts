import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { AuthUser } from './store/models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string; user: AuthUser | null }> {
    return this.http.post<{ token: string; user: AuthUser }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(({ user, token }) => {
        user.token = token;  // Attach the token to the user
        this.storeUser(user);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return of({ token: '', user: null });  // You could return an empty or error response
      })
    );
  }

  register(user: Partial<AuthUser>): Observable<{ token: string; user: AuthUser | null }> {
    return this.http.post<{ token: string; user: AuthUser }>(`${this.apiUrl}/register`, user).pipe(
      tap(({ user, token }) => {
        user.token = token;  // Attach the token to the user
        this.storeUser(user);
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        return of({ token: '', user: null });  // You could return an empty or error response
      })
    );
  }

  private storeUser(user: AuthUser): void {
    localStorage.setItem('authUser', JSON.stringify(user));
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user).token : null;  // Directly get the token from localStorage
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authUser');
  }
}
