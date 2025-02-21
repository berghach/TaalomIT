import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
