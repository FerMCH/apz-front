import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, take, tap, throwError } from 'rxjs';
import { ROUTE_CONFIG } from '../config/routes.config';
import { Credentials } from '../entities/credentials';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly #router = inject(Router);
  readonly #http = inject(HttpClient);

  #retrieveData(): Observable<{
    [key: string]: { password: string; token: string };
  }> {
    return this.#http.get<{
      [key: string]: { password: string; token: string };
    }>('/assets/auth.db.json');
  }

  execute(credentials: Credentials): Observable<string | never> {
    try {
      if (!credentials.username) {
        throw new Error('Compruebe sus datos');
      }

      return this.#retrieveData().pipe(
        map((data) => {
          const user = data[credentials.username];

          if (!user) {
            throw new Error('Compruebe sus datos');
          }

          if (user.password !== credentials.password) {
            throw new Error('Compruebe sus datos');
          }

          return user.token;
        }),

        tap((token) => {
          if (token) {
            this.#router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
          }
        }),

        take(1)
      );
    } catch (error) {
      console.warn(error);

      return throwError(() => error);
    }
  }
}
