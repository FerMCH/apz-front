import { Routes } from '@angular/router';
import { ROUTE_CONFIG } from './config/routes.config';
import { LayoutComponent } from './layout/layout.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard, authGuardLogin } from './guards/auth.guard';
import { LoanComponent } from './pages/loan/loan.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.register,
  },
  {
    path: ROUTE_CONFIG.register,
    canActivate: [authGuardLogin],
    component: RegisterComponent,
  },
  {
    path: ROUTE_CONFIG.login,
    canActivate: [authGuardLogin],
    component: LoginComponent,
  },
  {
    path: ROUTE_CONFIG.app,
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_CONFIG.home,
      },
      {
        path: ROUTE_CONFIG.home,
        canActivate: [authGuard],
        component: HomeComponent,
      },
      {
        path: ROUTE_CONFIG.historial,
        canActivate: [authGuard],
        component: HistorialComponent,
      },
      {
        path: ROUTE_CONFIG.loan,
        canActivate: [authGuard],
        component: LoanComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.register,
  },
];
