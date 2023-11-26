import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
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
  

  constructor(router: Router) {
    effect(() => {
      // if (this.store.isAuthenticated()) {
      //   // router.navigate(['/user']);
      // } else {
      //   router.navigate(['/']);
      // }
    });
  }
}
