import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ROUTE_CONFIG } from '../config/routes.config';
import { environment } from '../enviroment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseEndPoint = environment.authApi;

  isAuthenticatedSubject = new BehaviorSubject<boolean>(sessionStorage.getItem('token') != null);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  registerUser(data: any): Observable<any> {
      return this.http.post(`${this.baseEndPoint}/register`, data);

    }

    logout() {
      sessionStorage.removeItem('token');
      this.isAuthenticatedSubject.next(false);
      this.router.navigate([ROUTE_CONFIG.register]);

    }


}
