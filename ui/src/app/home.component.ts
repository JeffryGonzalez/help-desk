import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from './auth/auth.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prose prose-sm">
  <h1>Help Desk</h1>
  @if(store.isAuthenticated() === false) {
    <div class="alert ">
      <h2>You Must Be Signed In to Use This Application</h2>
      <button class="btn btn-primary" (click)="store.logIn()">Sign In</button>
  </div>
  }
</div>
  `,
  styles: ``
})
export class HomeComponent {
  store = inject(AuthStore);
}
