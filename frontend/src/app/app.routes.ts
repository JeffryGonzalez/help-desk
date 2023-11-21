import { Routes } from '@angular/router';
import { UserContactComponent } from './user/user-contact.component';
import { UserComponent } from './user/state/user.component';
import { UserIncidentBeginComponent, UserIncidentComponent, UserIncidentDescriptionComponent } from './user/user-incident.component';

export const routes: Routes = [
 
    {
        path: '',

        component: UserComponent,
        children: [
            {
                path: 'profile',
                component: UserContactComponent
            },
            {
                path: 'create-incident',
                component: UserIncidentComponent,
                children: [
                    {
                        path: '',
                        component: UserIncidentBeginComponent
                    },
                    {
                    path: ":id/description",
                    component: UserIncidentDescriptionComponent
                    }
                ]
            }
        ]
    }
];
