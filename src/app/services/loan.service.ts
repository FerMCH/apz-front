import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanRequest } from '../entities/loanRequest';
import { environment } from '../enviroment.dev';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private readonly http: HttpClient) { }

  private readonly baseEndPoint = environment.loan;

  createLoan(data: LoanRequest): Observable<any> {
    return this.http.post(`${this.baseEndPoint}`, data);
  }

  getLoan(id: string): Observable<any> {

    return this.http.get(`${this.baseEndPoint}/${id}`);
  }

}
