import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./auth/state/auth.component";
import { UserContactComponent } from "./user/user-contact.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <main class="container">
    <app-auth />
    <app-user-contact />
    <router-outlet />
</main>
  `,
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, AuthComponent, UserContactComponent]
})
export class AppComponent  {

}
