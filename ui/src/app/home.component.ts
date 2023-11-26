import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthFeature } from './auth/state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prose prose-sm">
  <h1>Help Desk</h1>
  @if(isAuthenticated() === false) {
    <div class="alert ">
      <h2>You Must Be Signed In to Use This Application</h2>
      <a href="/api/login" class="btn btn-primary" >Sign In</a>
  </div>
  }
</div>
  `,
  styles: ``
})
export class HomeComponent {
  store = inject(Store);
  isAuthenticated = this.store.selectSignal(AuthFeature.selectIsAuthenticated);
}
