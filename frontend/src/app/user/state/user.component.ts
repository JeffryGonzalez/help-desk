import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `<p>User</p>
  <section>
    <router-outlet />
  </section>
  
  `,
  imports: [RouterOutlet]
})
export class UserComponent {}
