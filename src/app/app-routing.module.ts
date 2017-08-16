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
            breadcrumb: 'Home'
        }
    },
    {
        path: '404',
        component: PageNotFoundComponent,
        canActivate: [CanActivateAuthentication]
    },
    {
        path: 'server-error',
        component: ServerErrorContainerComponent,
        canActivate: [CanActivateAuthentication]
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [CanActivateAuthentication]
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
