import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div>
      <!-- <section>
        <div role="tablist" class="tabs tabs-bordered tabs-lg mb-4">
          <a
            routerLink="incidents"
            [routerLinkActive]="['tab-active']"
            role="tab"
            class="tab"
            >Incidents</a
          >

          <a
            routerLink="user"
            [routerLinkActive]="['tab-active']"
            role="tab"
            class="tab"
            >You</a
          >
        </div>
      </section> -->
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class HomeComponent  {
 
 
}
