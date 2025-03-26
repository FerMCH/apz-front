import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { LoginService } from '../../services/login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent],
})
export class LoginComponent {
  readonly #loginService = inject(LoginService);

  readonly username = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  readonly password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  login(): void {
    this.#loginService
      .execute({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe();
  }
}
