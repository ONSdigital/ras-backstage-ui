import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgReduxRouterModule } from '@angular-redux/router';

const appRoutes:Routes = [

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        NgReduxRouterModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
