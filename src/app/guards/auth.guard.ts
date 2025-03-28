import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { ROUTE_CONFIG } from '../config/routes.config';

interface JwtPayload {
  exp: number;
  iat: number;
}

function isJwtValid(token: string): boolean {
  try {
      const parts = token.split('.');
      if (parts.length !== 3) {
          return false;
      }
      const payload = JSON.parse(atob(parts[1])) as JwtPayload;
      if (!payload.exp) {
          return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime < payload.exp;
  } catch (error) {
      console.error('Error al validar el JWT:', error);
      return false;
  }
}


export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (isJwtValid(sessionStorage.getItem('token') as string)) {
    return true;
  }
  return router.createUrlTree([ROUTE_CONFIG.register]);
};

export const authGuardLogin: CanActivateFn = () => {
  const router = inject(Router);
  if (isJwtValid(sessionStorage.getItem('token') as string)) {
    return router.createUrlTree([`${ROUTE_CONFIG.app}/${ROUTE_CONFIG.home}`]);
  }
  return true;

};
