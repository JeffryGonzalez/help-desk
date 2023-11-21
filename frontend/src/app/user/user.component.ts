import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { PendingUserIncidentCommands } from './state/pending-incidents/actions';

@Component({
 
  standalone: true,
  template: `
    <section class="relative">
      <div class="flex flex-row">
        <div class="basis-1/4 flex">
          <nav>
            <ul>
              <li>
                <a  (click)="begin()" class="btn btn-nav btm-nav-sm w-full mb-2"
                
                  >Create an Incident</a
                >
              </li>
              <li>
                <a routerLink="resolved" class="btn btn-nav btm-nav-sm w-full mb-2"
                  > Pending Incidents</a
                >
              </li>
            </ul>
          </nav>
        </div>
        <div class="basis-3/4 flex">
          <router-outlet></router-outlet>
        </div>
      </div>
    </section>
  `,
  imports: [RouterModule, RouterLinkActive],
})
export class UserComponent {
  
  private readonly store = inject(Store);
  begin() {
    this.store.dispatch(PendingUserIncidentCommands.createNewIncident());
  }
}
