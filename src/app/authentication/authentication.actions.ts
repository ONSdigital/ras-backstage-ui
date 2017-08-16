import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationActions {

    static AUTHENTICATE_CREDENTIALS = 'AUTHENTICATE_CREDENTIALS';
    static AUTHENTICATE_CREDENTIALS_RESPONSE = 'AUTHENTICATED_CREDENTIALS';

    constructor(
        private ngRedux: NgRedux<any>,
        private authenticationService: AuthenticationService) {}

    public authenticateCredentials(username: string, password: string) {

        this.ngRedux.dispatch({
            type: AuthenticationActions.AUTHENTICATE_CREDENTIALS,
            username: username,
            password: password
        });

        const observable = this.authenticationService.authenticateCredentials(username, password)
            .share();

        observable.subscribe(
            (res: any) => this.authenticateCredentialsResponse(res),
            (err: any) => console.log('Could not dispatch authenticateCredentialsResponse action, service error: ', err)
        );
        return observable;
    }

    public authenticateCredentialsResponse(response: any) {

        this.ngRedux.dispatch({
            type: AuthenticationActions.AUTHENTICATE_CREDENTIALS_RESPONSE,
            response: response
        });
    }
}
