import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInContainerComponent } from './sign-in/sign-in.container';

export const authenticationRoutes: Routes = [
    {
        path: 'sign-in',
        component: SignInContainerComponent,
        data: {
            breadcrumb: 'Sign in'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authenticationRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthenticationRoutingModule {}
