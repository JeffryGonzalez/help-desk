import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components";
import { AuthComponent } from "./auth";

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
 
}
