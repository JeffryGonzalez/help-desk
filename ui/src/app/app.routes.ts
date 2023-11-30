import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { IncidentItemComponent, IncidentsComponent, IncidentsListComponent, ProfileComponent, UserComponent, UserProfileStore } from './features/user';
import { HomeComponent } from './home.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [loggedInGuard()],
    providers: [UserProfileStore],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'incidents',
        component: IncidentsComponent,
        providers: [],
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
