import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role } from '../store/models/auth.models';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  // Vérifier les rôles si définis dans la route
  const expectedRoles = route.data?.['roles'] as Role[] | undefined;
  if (expectedRoles && !expectedRoles.includes(user.role)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
