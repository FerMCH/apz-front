import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';
import { AplazoSidenavLinkComponent } from '@apz/shared-ui/sidenav';
import { ROUTE_CONFIG } from '../config/routes.config';
import { LayoutService } from '../utils/layout.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
})

export class LayoutComponent implements OnInit {
  readonly appRoutes = ROUTE_CONFIG;

  layout: string = '';
  subscription: Subscription;
  loanEnable = false;

  tittle$: Observable<string>

  constructor(
    private readonly layoutService: LayoutService,
    private readonly authService: AuthService,
    private readonly route: Router,
    private readonly store: Store<{tittle: string}>
  ) {
    this.tittle$ = this.store.select('tittle');
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.subscription = this.layoutService.currentMessage$.subscribe(
        (layout) => {
          this.layout = layout;
        }
      );
    }, 0);
  }

  clickLogo(): void {
    this.authService.logout();
  }
}
