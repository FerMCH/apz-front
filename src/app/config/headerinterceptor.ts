import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return next(modifiedReq);
};


const token = sessionStorage.getItem('token');
