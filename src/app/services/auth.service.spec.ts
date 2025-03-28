import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environment.dev';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('registerUser', () => {
    it('debería realizar una solicitud POST al endpoint correcto', () => {
      const testData = { username: 'test', password: '1234' };
      const mockResponse = { success: true, token: 'fake-token' };

      service.registerUser(testData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpMock.expectOne(`${environment.authApi}/register`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(testData);

      request.flush(mockResponse);
    });

  });

  describe('logout', () => {

    it('debería llamar tanto a removeItem como a navigate', () => {
      const removeItemSpy = spyOn(sessionStorage, 'removeItem');
      const navigateSpy = spyOn(router, 'navigate');

      service.logout();

      expect(removeItemSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
