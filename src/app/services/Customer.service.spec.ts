import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environment.dev';
import { CustomerRequest } from '../entities/customerRequest';
import { CustomerService } from './Customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  const mockBaseUrl = environment.customer;

  const mockCustomerRequest: CustomerRequest = {
    firstName: 'Juan',
    lastName: 'López',
    secondLastNme: 'Pérez',
    dateOfBirth: '2009-11-02',
  };

  const mockCustomerResponse = {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    createdAt: '2025-03-28T11:44:08.054Z',
    creditLineAmount: 1,
    availableCreditLineAmount: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService,
        { provide: environment, useValue: { customer: mockBaseUrl } },
      ],
    });

    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('createCustomer', () => {
    it('Debería realizar un Post de createCustomer', () => {
      service.createCustomer(mockCustomerRequest).subscribe((response) => {
        expect(response).toEqual(mockCustomerResponse);
      });

      const req = httpMock.expectOne(mockBaseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCustomerRequest);

      req.flush(mockCustomerResponse);
    });
  });

  describe('getCustomer', () => {
    it('Debería hacer una llamada Get', () => {
      const customerId = '123';

      service.getCustomer(customerId).subscribe((response) => {
        expect(response).toEqual(mockCustomerResponse);
      });

      const req = httpMock.expectOne(`${mockBaseUrl}/${customerId}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockCustomerResponse);
    });
  });
});
