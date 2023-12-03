import { Routes } from '@angular/router';
import { loggedInGuard } from './auth';
import { IncidentItemComponent, IncidentsComponent, IncidentsListComponent, ProfileComponent, UserComponent, UserProfileStore } from './features/user';
import { HomeComponent } from './home.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [loggedInGuard()],
    providers: [UserProfileStore],
    children: [
      {
        path: 'incidents',
        component: IncidentsComponent,
        providers: [],
        children: [
          {
            path: '',
            component: IncidentsListComponent,
          },
          {
            path: ':id',
            component: IncidentItemComponent,
          },
        ],
      },
      {
        path: 'user',
        component: UserComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent,
          },
        ],
      },
    ],
  },
];


