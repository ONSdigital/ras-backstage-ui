import { NgModule } from '@angular/core';

import { applyMiddleware, Store, compose, createStore } from 'redux';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { BrowserModule } from '@angular/platform-browser';
import * as Immutable from 'immutable';

import { AppRoutingModule } from './app-routing.module';
import rootReducer from './app.reducer';
import { AppComponent } from './app.component';
import { IAppState } from './app-state.interface';

import { AuthenticationModule } from './authentication/authentication.module';
import { CollectionExerciseModule } from './collection-exercises/collection-exercises.module';
import { SecureMessagesModule } from './secure-messages/secure-messages.module';

import { ServerErrorContainerComponent } from './shared/server-error/server-error.container';
import { ServerErrorComponent } from './shared/server-error/server-error.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './shared/home/home.component';
import { SiteSearchContainerComponent } from './shared/site-search/site-search.container';
import { SiteSearchComponent } from './shared/site-search/site-search.component';

// const createLogger = require('redux-logger');


/**
 * Redux dev tools don't work well Angular 2 + zones.
 */
// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;*/


@NgModule({
    imports: [
        NgReduxModule,
        NgReduxRouterModule,
        BrowserModule,

        AuthenticationModule,
        CollectionExerciseModule,
        SecureMessagesModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ServerErrorContainerComponent,
        ServerErrorComponent,
        PageNotFoundComponent,
        HomeComponent,
        SiteSearchContainerComponent,
        SiteSearchComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private ngReduxRouter: NgReduxRouter,
        private devTools: DevToolsExtension) {

        this.ngRedux.configureStore(
            rootReducer,
            {
                collectionExercises: {
                    isFetching: false,
                    items: []
                },
                secureMessages: Immutable.Map({
                    isFetching: false,
                    stateMessage: null,
                    items: Immutable.List([])
                }),
                user: {
                    isFetching: false,
                    item: null
                }
            },
            null,
            /*[
                createLogger()
            ],*/
            devTools.isEnabled() ? [devTools.enhancer()] : []
        );
        ngReduxRouter.initialize();

        /*const store: Store<any> = createStore(
            rootReducer,
            {},
            compose(
                applyMiddleware(createLogger()),
                (devTools.isEnabled() ? devTools.enhancer() : null))
        );

        this.ngRedux.provideStore(store);
        this.ngReduxRouter.initialize(/!* args *!/);*/
    }
}
