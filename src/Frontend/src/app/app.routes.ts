import { Routes } from '@angular/router';
import { loggedInGuard } from './auth';
import { IncidentItemComponent, IncidentsComponent, IncidentsListComponent, ProfileComponent, UserComponent, UserProfileStore } from './features/user';
import { HomeComponent } from './home.component';
import { TechsComponent } from './features/techs/techs.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [loggedInGuard()],
    providers: [UserProfileStore],
    children: [
      {
        path: '',
        component: IncidentsListComponent,
      },
      {
        path: 'techs',
        component: TechsComponent
      },
      
      {
        path: 'user',
        component: UserComponent,
        children: [
          {
            path: 'profile',
            component: ProfileComponent,
          }
        ],
      },
    ],
  },
];


