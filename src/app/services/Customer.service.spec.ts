/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CustomerService } from './Customer.service';

describe('Service: CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService]
    });
  });

  it('should ...', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));
});
