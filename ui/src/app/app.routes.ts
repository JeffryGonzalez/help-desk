import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { HomeComponent } from './home.component';
import { IncidentItemComponent } from './user/incidents/incident-item.component';
import { IncidentsListComponent } from './user/incidents/incidents-list.component';
import { IncidentsComponent } from './user/incidents/incidents.component';
import { UserIncidentsStore } from './user/incidents/user-incident.store';
import { UserStore } from './user/profile';
import { ProfileComponent } from './user/profile/profile.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [loggedInGuard()],
    providers: [UserStore],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'incidents',
        component: IncidentsComponent,
        providers: [UserIncidentsStore],
        children: [
          {
            path: '',
            component: IncidentsListComponent
          },
          {
            path: ":id",
            component: IncidentItemComponent
          }
        ]
      },
    ],
  },
];

function loggedInGuard(): CanActivateFn {
  return () => {
    const store = inject(AuthService);
    return store.checkAuth().result$.pipe(
      map((x) => !!x),
    );
  };
}
