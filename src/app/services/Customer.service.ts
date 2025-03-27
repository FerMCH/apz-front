import { environment } from '../../../environment.dev';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRequest } from '../entities/customerRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly baseEndPoint = environment.customer;

  constructor(private readonly http: HttpClient) { }

  createCustomer(data: CustomerRequest): Observable<any> {
    return this.http.post(this.baseEndPoint, data);
  }

  getCustomer(id: string): Observable<any> {
    return this.http.get(`${this.baseEndPoint}/${id}`);
  }



}
