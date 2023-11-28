import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthFeature } from './auth/state';
import { HomeComponent } from './home.component';
import { IncidentsComponent } from './user/incidents/incidents.component';
import { UserStore } from './user/profile';
import { ProfileComponent } from './user/profile/profile.component';
import { UserComponent } from './user/user.component';
import { IncidentItemComponent } from './user/incidents/incident-item.component';
import {  UserIncidentsStore } from './user/incidents/user-incident.store';
import { IncidentsListComponent } from './user/incidents/incidents-list.component';

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
    const store = inject(Store);
    return store.select(AuthFeature.selectIsAuthenticated);
  };
}
