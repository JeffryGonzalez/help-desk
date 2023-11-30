import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthComponent } from "./auth";
import { HeaderComponent } from "./components";
import { AuthService } from './auth/auth.service';
import { filterSuccessResult } from '@ngneat/query';
import { tap } from 'rxjs';
import { UserIdService } from './auth/user-id.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header />
    <main class="container mx-auto">
      @if(auth().isLoading) {
      <span class="loading loading-ring loading-lg"></span>
      } @if(auth().data; as data) {

      <router-outlet />
      } @if(auth().error) {
      <div class="alert alert-info">
        <p>You are not logged in. Please log in.</p>
        <a class="btn btn-primary" href="/api/login">Log in</a>
      </div>
      }
    </main>
  `,
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
})
export class AppComponent implements OnInit  {
  private readonly service = inject(AuthService);
  private readonly router = inject(Router);
  auth = this.service.checkAuth().result;

  private readonly userId = inject(UserIdService);

  ngOnInit() {
    this.service.checkAuth().result$.pipe(
      filterSuccessResult(),
      tap((result) => this.userId.setUserId(result.data)),
      tap(() => this.router.navigate(['/user'])
    )).subscribe();
  }
}
