import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { DatePipe } from '@angular/common';
import { LayoutService } from '../../utils/layout.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  standalone: true,
  imports: [DatePipe],
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  loanId = '';
  loan: any;
  constructor(private readonly activatedRoute: ActivatedRoute, private readonly loanService: LoanService,
    private readonly layoutService: LayoutService ){
    this.loanId = this.activatedRoute.snapshot.queryParams['loanId'];
   }

  ngOnInit() {
    this.loanService.getLoan(this.loanId).subscribe(response => {
      this.loan =response;
      this.layoutService.messageSource.next('Préstamo');
    })
  }

}
