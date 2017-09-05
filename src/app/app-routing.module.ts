import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServerErrorContainerComponent } from './shared/server-error/server-error.container';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './shared/home/home.component';

import { CanActivateAuthentication } from './authentication/shared/authentication-route-guard.resolver';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [CanActivateAuthentication],
        data: {
            title: 'Home - ONS Data Collection',
            breadcrumb: 'Home'
        }
    },
    {
        path: '404',
        component: PageNotFoundComponent,
        canActivate: [CanActivateAuthentication],
        data: {
            title: '404 Not found - ONS Data Collection',
        }
    },
    {
        path: 'server-error',
        component: ServerErrorContainerComponent,
        canActivate: [CanActivateAuthentication],
        data: {
            title: 'Server error - ONS Data Collection',
        }
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [CanActivateAuthentication],
        data: {
            title: '404 Not found - ONS Data Collection',
        }
    }
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
