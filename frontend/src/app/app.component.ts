import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./auth/state/auth.component";
import { HeaderComponent } from "./components/header.component";

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
    imports: [CommonModule, RouterOutlet, AuthComponent, HeaderComponent]
})
export class AppComponent  {

}
