import { provideStore } from '@ngrx/store';
import { headersInterceptor } from './config/headerinterceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TittleReducer } from './store/products/tittle.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),
    provideStore({ tittle: TittleReducer }),
    provideHttpClient(withInterceptors([headersInterceptor]))
  ],
};
