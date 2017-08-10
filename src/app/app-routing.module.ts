import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServerErrorContainerComponent } from './shared/server-error/server-error.container';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './shared/home/home.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            breadcrumb: 'Home'
        }
    },
    {
        path: '404',
        component: PageNotFoundComponent
    },
    {
        path: 'server-error',
        component: ServerErrorContainerComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
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
