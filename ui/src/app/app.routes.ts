import { inject } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { AuthStore } from './auth/auth.store';
import { HomeComponent } from './home.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { UserStore } from './user/profile';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [loggedInGuard],
        providers: [UserStore],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]

    }
];

function loggedInGuard(): CanActivateFn {
    return () => {
        const store = inject(AuthStore);
        return store.isAuthenticated();
    };
}