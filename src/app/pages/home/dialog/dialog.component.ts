import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { ROUTE_CONFIG } from '../../../config/routes.config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [AplazoButtonComponent],
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(private readonly route: Router) { }

  @Input()
  title: string = '';

  @Input()
  loanId: string = '';

  @Input()
  error: boolean = false;

  @Output()
  visibleChange = new EventEmitter<boolean>();

  close() {
    this.visibleChange.emit(false);
  }

  openLoanDetails() {
    this.route.navigate([`${ROUTE_CONFIG.app}/${ROUTE_CONFIG.loan}`],{ queryParams: { loanId: this.loanId } });
  }

}
