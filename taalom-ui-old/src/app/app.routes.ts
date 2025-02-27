import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
