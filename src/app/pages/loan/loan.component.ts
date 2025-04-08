import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { DatePipe } from '@angular/common';
import { LayoutService } from '../../utils/layout.service';
import { Store } from '@ngrx/store';
import { TittleActions } from '../../store/products/tittle.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  standalone: true,
  imports: [DatePipe],
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent implements OnInit, OnDestroy {
  loanId = '';
  loan: any;
  private destroy$ = new Subject<void>();

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
    this.loanService.getLoan(this.loanId).pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      this.loan = response;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
