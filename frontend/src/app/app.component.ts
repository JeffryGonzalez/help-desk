import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./auth/state/auth.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-auth />
  `,
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, AuthComponent]
})
export class AppComponent  {

}
