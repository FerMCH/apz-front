import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { CustomerService } from '../../services/Customer.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ROUTE_CONFIG } from '../../config/routes.config';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent],
  providers: [CustomerService],
})
export class RegisterComponent {
  constructor(
    private readonly customerService: CustomerService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  emailActivated = false;

  errorMessage: string = '';

  readonly email = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  passwordActivated = false;

  readonly password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  firstNameActivated = false;

  readonly firstName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  lastNameActivated = false;

  readonly lastName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  secondLastNameActivated = false;

  readonly secondLastName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly dateOfBirth = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly form = new FormGroup({
    email: this.email,
    password: this.password,
    firstName: this.firstName,
    lastName: this.lastName,
    secondLastName: this.secondLastName,
    dateOfBirth: this.dateOfBirth,
  });

  validateAge(): boolean {
    if (this.form.controls.dateOfBirth.value.length == 0) {
      return false;
    }

    const dateOfBirth = new Date(this.form.controls.dateOfBirth.value);
    const today = new Date();
    const years = today.getFullYear() - dateOfBirth.getFullYear();
    const months = today.getMonth() - dateOfBirth.getMonth();
    const days = today.getDate() - dateOfBirth.getDate();

    if (years > 18) {
      return true;
    }
    if (years == 18 && months > 0) {
      return true;
    }
    if (years == 18 && months == 0 && days > 0) {
      return true;
    }
    return false;
  }

  register(): void {
    this.errorMessage = '';

    this.authService
      .registerUser({
        username: this.form.controls.email.value,
        password: this.form.controls.password.value,
      })
      .subscribe({
        next: (token) => {
          sessionStorage.setItem('token', token.token);
          this.customerService
            .createCustomer({
              firstName: this.form.controls.firstName.value,
              lastName: this.form.controls.lastName.value,
              secondLastNme: this.form.controls.secondLastName.value,
              dateOfBirth: this.form.controls.dateOfBirth.value,
            })
            .subscribe({
              next: (response) => {
                sessionStorage.setItem('userId', response.id);
                this.route.navigate([
                  `${ROUTE_CONFIG.app}/${ROUTE_CONFIG.home}`,
                ]);
              },
              error: (err) => {
                this.errorMessage = 'Algo salió mal. Intenta más tarde.';
              },
            });
        },
        error: (err) => {
          this.errorMessage = 'Algo salió mal. Intenta más tarde.';
        },
      });
  }
}
