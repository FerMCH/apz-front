import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { DatePipe } from '@angular/common';
import { LayoutService } from '../../utils/layout.service';
import { Store } from '@ngrx/store';
import { TittleActions } from '../../store/products/tittle.actions';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  standalone: true,
  imports: [DatePipe],
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent implements OnInit {
  loanId = '';
  loan: any;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly loanService: LoanService,
    private readonly layoutService: LayoutService,
    private readonly store: Store<{tittle: string}>
    ) {
      this.store.dispatch(TittleActions.updateLayout({
        tittle: 'Préstamo'
      }));
    this.loanId = this.activatedRoute.snapshot.queryParams['loanId'];
    //this.layoutService.messageSource.next('Préstamo');
  }

  ngOnInit() {
    this.loanService.getLoan(this.loanId).subscribe((response) => {
      this.loan = response;
    });
  }
}
