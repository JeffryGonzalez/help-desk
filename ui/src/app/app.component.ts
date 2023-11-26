import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components";
import { AuthComponent } from "./auth";
import { Store } from '@ngrx/store';
import { AuthActions, AuthFeature } from './auth/state';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <app-header />
  <app-auth />
    <main class="container mx-auto">

      <router-outlet />
    </main>
  `,
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, AuthComponent]
})
export class AppComponent {
  title = 'ui';
  store = inject(Store);
  constructor() {
    this.store.dispatch(AuthActions.checkAuth());
  }
 
}
