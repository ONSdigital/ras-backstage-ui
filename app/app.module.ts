import { applyMiddleware, Store, compose, createStore } from 'redux';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { NgReduxRouterModule, NgReduxRouter } from 'ng2-redux-router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import rootReducer from './app.reducer';
import { AppComponent } from './app.component';
import { IAppState } from './app-state.interface';

const createLogger = require('redux-logger');

/**
 * Redux dev tools don't work well Angular 2 + zones.
 */
//const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;*/

@NgModule({
    imports: [
        NgReduxModule.forRoot(),
        NgReduxRouterModule,
        BrowserModule,

        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private devTools: DevToolsExtension,
        private ngReduxRouter: NgReduxRouter) {

        const store: Store<any> = createStore(
            rootReducer,
            {},
            compose(
                applyMiddleware(createLogger()),
                (devTools.isEnabled() ? devTools.enhancer() : null))
        );

        this.ngRedux.provideStore(store);
        this.ngReduxRouter.initialize(/* args */);
    }
}
