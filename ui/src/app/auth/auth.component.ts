import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from './auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
   
  `,
  styles: ``,
})
export class AuthComponent {
  store = inject(AuthStore);

  constructor(router: Router) {
    effect(() => {
      if (this.store.isAuthenticated()) {
        router.navigate(['/user']);
      } else {
        router.navigate(['/']);
      }
    });
  }
}
