import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTE_CONFIG } from '../config/routes.config';
import { environment } from '../../../environment.dev';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseEndPoint = environment.authApi;
  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  registerUser(data: any): Observable<any> {
      return this.http.post(`${this.baseEndPoint}/register`, data);

    }

    logout() {
      sessionStorage.removeItem('token');
      this.router.navigate([ROUTE_CONFIG.register]);

    }


}
