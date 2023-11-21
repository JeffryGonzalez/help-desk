import { Routes } from '@angular/router';
import { UserContactComponent } from './user/user-contact.component';
import { UserComponent } from './user/user.component';
import { UserIncidentComponent } from './user/user-incident.component';
import { UserIncidentDescriptionComponent } from './user/user-incident-description.component';
import { UserInicidentContactComponent } from './user/user-incident-contact.component';
import { UserIssueReviewComponent } from './user/user-incident.review.component';
import { UserHomeComponent } from './user/user-home.component';

export const routes: Routes = [
  {
    path: '',

    component: UserComponent,
    children: [
      {
        path: '',
        component: UserHomeComponent
      },
      {
        path: 'profile',
        component: UserContactComponent,
      },
      {
        path: 'create-incident/:id',
        component: UserIncidentComponent,
        children: [
         
          {
            path: 'description',
            component: UserIncidentDescriptionComponent,
          },
          {
            path: 'contact',
            component: UserInicidentContactComponent,
          },
          {
            path: 'review',
            component: UserIssueReviewComponent,
          }
        ],
      },
    ],
  },
];
