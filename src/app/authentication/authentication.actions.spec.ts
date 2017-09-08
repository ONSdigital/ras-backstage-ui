import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenticationActions } from './authentication.actions';
import { AuthenticationService } from './authentication.service';

let mockAuthenticationService: any,
    mockReduxStore: any,
    mockObservable_response: any,
    successResponse: any = {},
    failResponse = 'Erroring';

const originalLog = console.log;

describe('AuthenticationActions', () => {

    beforeEach(() => {

        mockReduxStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {}
        };

        mockAuthenticationService = {
            authenticateCredentials() {
                return mockObservable_response;
            }
        };

        spyOn(console, 'log');
        spyOn(mockReduxStore, 'dispatch');
        spyOn(mockAuthenticationService, 'authenticateCredentials').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule
            ],
            providers: [
                AuthenticationActions,
                { provide: NgRedux, useValue: mockReduxStore },
                { provide: AuthenticationService, useValue: mockAuthenticationService }
            ]
        });
    });

    afterEach(() => {
        mockAuthenticationService = undefined;
        mockObservable_response = undefined;
        mockReduxStore = undefined;
        successResponse = {};
        failResponse = 'Erroring';

        console.log = originalLog;
    });

    describe('authenticateCredentials [method]', () => {

        it('should dispatch ' + AuthenticationActions.AUTHENTICATE_CREDENTIALS + ' redux action',
            inject([AuthenticationActions],
                (authenticationActions: AuthenticationActions) => {
                    const username = 'testUser';
                    const pw = 'testPassword';

                    mockObservable_response = Observable.of({});

                    authenticationActions.authenticateCredentials(username, pw).subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: AuthenticationActions.AUTHENTICATE_CREDENTIALS,
                        username: username,
                        password: pw
                    });
                }));

        it('should call AuthenticationService authenticateCredentials method to authenticate a users credentials',
            inject([AuthenticationActions],
                (authenticationActions: AuthenticationActions) => {
                    const username = 'testUser';
                    const pw = 'testPassword';

                    mockObservable_response = Observable.of({});

                    authenticationActions.authenticateCredentials(username, pw).subscribe();

                    expect(mockAuthenticationService.authenticateCredentials).toHaveBeenCalledWith(username, pw);
                }));

        describe('after successfully authenticating a user', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call authenticateCredentialsResponse',
                inject([AuthenticationActions],
                    (authenticationActions: AuthenticationActions) => {
                        const username = 'invalidUser';
                        const pw = 'invalidPassword';

                        spyOn(authenticationActions, 'authenticateCredentialsResponse');

                        authenticationActions.authenticateCredentials(username, pw).subscribe();

                        expect(authenticationActions.authenticateCredentialsResponse).toHaveBeenCalled();
                    }));
        });

        describe('after failing to authenticate a user', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([AuthenticationActions],
                    (authenticationActions: AuthenticationActions) => {
                        const username = 'invalidUser';
                        const pw = 'invalidPassword';

                        authenticationActions.authenticateCredentials(username, pw).subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch authenticateCredentialsResponse action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('authenticateCredentialsResponse [method]', () => {

        const response: any = {
            something: 'here'
        };

        it('should dispatch ' + AuthenticationActions.AUTHENTICATE_CREDENTIALS_RESPONSE  + ' redux action',
            inject([AuthenticationActions],
                (authenticationActions: AuthenticationActions) => {
                    authenticationActions.authenticateCredentialsResponse(response);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: AuthenticationActions.AUTHENTICATE_CREDENTIALS_RESPONSE,
                        response: response
                    });
                }));
    });
});
