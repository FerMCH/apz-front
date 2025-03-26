import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ROUTE_CONFIG } from '../config/routes.config';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      return router.createUrlTree([ROUTE_CONFIG.register]);
    })
  );
};

export const authGuardLogin: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        return true;
      }
      return router.createUrlTree([`${ROUTE_CONFIG.app}/${ROUTE_CONFIG.home}`]);
    })
  );
};
