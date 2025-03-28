import { AfterContentInit, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { uuidValidator } from '../../directives/uuidValidator.directive';
import { LayoutService } from '../../utils/layout.service';
import { LoanService } from '../../services/loan.service';
import { CustomerService } from '../../services/Customer.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [ReactiveFormsModule, AplazoButtonComponent, DialogComponent],
})
export class HomeComponent implements AfterContentInit {

  showModal = false;
  loanId = '';
  dialogTittle = '';
  dialogError = false;

  constructor(private readonly layoutService: LayoutService, private readonly loanService: LoanService,
      private readonly customerService: CustomerService) {

    this.customerService.getCustomer(sessionStorage.getItem('userId') as string).
    subscribe(response => {
    });
  }

  ngAfterContentInit(): void {
    this.layoutService.messageSource.next('Home');
  }

  readonly customerId = new FormControl<string>(sessionStorage.getItem('userId') as string, {
      nonNullable: true,
      validators: [Validators.required, uuidValidator()],
    });

    readonly amount = new FormControl<number>(1000.0, {
      nonNullable: true,
      validators: [Validators.required],
    });


    readonly form = new FormGroup({
      customerId: this.customerId,
      amount: this.amount
    });

    toggleModal() {
      this.showModal = !this.showModal;
    }


    createLoan() {
      this.loanService.createLoan({
        customerId: this.form.controls.customerId.value,
        amount: this.form.controls.amount.value
      }
    ).subscribe({
      next:(response) => {
        this.loanId = response.id;
        this.dialogTittle = 'Se ha registrado el numero préstamo';
        this.dialogError = false;
        this.toggleModal();
        },
      error:(err) => {
        this.dialogTittle = 'Estamos teniendo dificultades, por favor, intente más tarde';
        this.dialogError = true;
        this.toggleModal();
      }
    });
    }


}
