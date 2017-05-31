import { NgModule } from '@angular/core';

import { applyMiddleware, Store, compose, createStore } from 'redux';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import rootReducer from './app.reducer';
import { AppComponent } from './app.component';
import { IAppState } from './app-state.interface';

import { CollectionExerciseModule } from './collection-exercises/collection-exercises.module';
import { SecureMessagesModule } from './secure-messages/secure-messages.module';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './shared/home/home.component';

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

        CollectionExerciseModule,
        SecureMessagesModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HomeComponent
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
                secureMessages: {
                    isFetching: false,
                    items: []
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
