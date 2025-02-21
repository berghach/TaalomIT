import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService =  inject(AuthService);  // Create an instance of AuthService or inject it

  // Replace with the actual check for authentication
  if (authService.isAuthenticated()) {
    return true;  // Allow route activation
  } else {
    // Optionally, redirect to the login page if not authenticated
    window.location.href = '/';  // Or use the router to navigate
    return false;  // Prevent route activation
  }
};
