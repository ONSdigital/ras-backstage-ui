import { TestBed, inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import {
    Headers,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { global } from '../shared/utils';

import { createBadRequest } from '../../../testing-utils';

import { AuthenticationService, CheckRequestAuthenticated } from './authentication.service';

let mockRouter: any,
    mockActivatedRoute: any;

const originalGlobalObj = global;
const originalConsoleLog: any = console.log;
const originalWindowLocationHref = window.location.href;

describe('AuthenticationService', () => {

    beforeEach(() => {

        window.sessionStorage.clear();

        mockRouter = {
            navigate: function () {},
            navigateByUrl: function () {}
        };

        mockActivatedRoute = {
            snapshot: {
                queryParams: {
                    returnUrl: '98765'
                }
            }
        };

        spyOn(mockRouter, 'navigate');
        spyOn(mockRouter, 'navigateByUrl');
        spyOn(console, 'log').and.callThrough();
        spyOn(window.sessionStorage, 'setItem');

        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                AuthenticationService,
                { provide: Router, useValue: mockRouter },
                { provide: XHRBackend, useClass: MockBackend },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });
    });

    afterEach(() => {
        console.log = originalConsoleLog;
    });

    describe('initialisation', () => {

        it('should initialise correctly',
            inject([AuthenticationService],
                (authenticationService: AuthenticationService) => {
                    spyOn(window.sessionStorage, 'getItem');

                    authenticationService.init();

                    expect(window.sessionStorage.getItem).toHaveBeenCalledWith('token');
                }));

        describe('when user is already signed in', () => {

            it('should initialise correctly',
                inject([AuthenticationService],
                    (authenticationService: AuthenticationService) => {

                        const token = '1234678';

                        spyOn(authenticationService.encryptedHeaders, 'set');
                        spyOn(window.sessionStorage, 'getItem').and.callFake((tk: string) => {
                            return token;
                        });

                        authenticationService.init();

                        expect(authenticationService.encryptedHeaders.set)
                        .toHaveBeenCalledWith('Authorization', token);
                    }));
        });

        describe('when user is not already signed in', () => {

            it('should initialise correctly',
                inject([AuthenticationService],
                    (authenticationService: AuthenticationService) => {

                        spyOn(authenticationService.encryptedHeaders, 'set');
                        spyOn(window.sessionStorage, 'getItem').and.callFake((tk: string): any => {
                            return null;
                        });

                        authenticationService.init();

                        expect(authenticationService.encryptedHeaders.set).not.toHaveBeenCalled();
                    }));
        });
    });

    describe('authenticateCredentials [method]', () => {

        it('should successfully POST user credentials',
            inject([AuthenticationService, XHRBackend],
                (authenticationService: AuthenticationService, mockBackend: MockBackend) => {

                    const mockResponse: any = {
                        token: '9876'
                    };

                    mockBackend.connections.subscribe((connection: any) => {
                        connection.mockRespond(
                            new Response(
                                new ResponseOptions({
                                    body: JSON.stringify(mockResponse)
                                })));
                    });

                    const mockServiceCall = authenticationService
                        .authenticateCredentials('someUser', 'somePassword');

                    mockServiceCall.subscribe((serverResponse: any) => {
                        expect(serverResponse.json()).toEqual(mockResponse);
                    });
                }));

        describe('when user authenticates', () => {

            it('should sign user in to system successfully',
                inject([AuthenticationService, XHRBackend],
                    (authenticationService: AuthenticationService, mockBackend: MockBackend) => {

                        const mockResponse: any = {
                            token: '9876'
                        };

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        body: JSON.stringify(mockResponse)
                                    })));
                        });

                        spyOn(authenticationService.encryptedHeaders, 'set');

                        authenticationService
                            .authenticateCredentials('someUser', 'somePassword').subscribe();

                        expect(window.sessionStorage.setItem)
                            .toHaveBeenCalledWith('token', mockResponse.token);
                        expect(authenticationService.encryptedHeaders.set)
                            .toHaveBeenCalledWith('Authorization', mockResponse.token);
                        expect(mockRouter.navigateByUrl)
                            .toHaveBeenCalledWith(mockActivatedRoute.snapshot.queryParams.returnUrl);
                    }));
        });

        describe('when user does not authenticate', () => {

            it('should not sign user in to system',
                inject([AuthenticationService, XHRBackend],
                    (authenticationService: AuthenticationService, mockBackend: MockBackend) => {

                        mockBackend.connections.subscribe((connection: any) => {
                            const res = new Response(
                                new ResponseOptions({
                                    body: {}
                                }));

                            res.ok = false;
                            res.status = 500;
                            res.statusText = '';
                            res.type = 3;
                            res.url = null;

                            connection.mockError(res);
                        }, () => {});

                        spyOn(authenticationService.encryptedHeaders, 'set');

                        authenticationService
                            .authenticateCredentials('invalidUser', 'invalidPassword').subscribe(
                            () => {},
                            (res: any) => {
                                expect(console.log).toHaveBeenCalledWith('Bad request: ', res);
                            }
                        );

                        expect(window.sessionStorage.setItem).not.toHaveBeenCalled();
                        expect(authenticationService.encryptedHeaders.set).not.toHaveBeenCalled();
                        expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
                    }));
        });
    });

    describe('isAuthenticated [method]', () => {

        it('should return true when user is authenticated',
            inject([AuthenticationService],
                (authenticationService: AuthenticationService) => {

                    authenticationService.encryptedHeaders.set('Authorization', 'token-value-here');

                    const result = authenticationService.isAuthenticated();

                    expect(result).toEqual(true);
                }));

        it('should return false when user is not authenticated',
            inject([AuthenticationService],
                (authenticationService: AuthenticationService) => {

                    const result = authenticationService.isAuthenticated();

                    expect(result).toEqual(false);
                }));
    });

    describe('CheckRequestAuthenticated [decorator]', () => {

        function resetAuthentication () {
            AuthenticationService.routerCache = {
                url: 'someurl',
                navigate () {}
            };
        }

        function createCallDecoratorBinding (errorResponse: any) {
            const binding: any = CheckRequestAuthenticated();
            const method: any = function () {
                return errorResponse;
            };
            const descriptorValue = {
                value: method
            };

            /**
             * Decorate method
             */
            binding({}, '', descriptorValue);

            return descriptorValue.value;
        }

        describe('when response status is equal to 401', () => {

            let errorResponse: any;

            beforeEach(() => {
                errorResponse = createBadRequest({
                    status: 401
                });
            });

            it('should call console log with authorisation error', () => {
                const result = createCallDecoratorBinding(errorResponse)();

                result.subscribe(
                    () => {},
                    (err: any) => {
                        expect(console.log).toHaveBeenCalledWith('Unauthorised request: ', err);
                    }
                );
            });

            describe('and router exists on AuthenticationService', () => {

                beforeEach(() => {
                    resetAuthentication();
                    spyOn(AuthenticationService.routerCache, 'navigate');
                });

                afterEach(() => {
                    resetAuthentication();
                });


                it('should navigate to sign-in page with returnUrl query parameter', () => {
                    const result = createCallDecoratorBinding(errorResponse)();

                    result.subscribe(
                        () => {},
                        (err: any) => {
                            expect(AuthenticationService.routerCache.navigate).toHaveBeenCalledWith(['/sign-in'], {
                                queryParams: {
                                    returnUrl: 'someurl'
                                }
                            });
                        }
                    );
                });
            });

            describe('and router does not exist on AuthenticationService', () => {

                beforeEach(() => {
                    spyOn(global, 'changeLocation');
                    AuthenticationService.routerCache = undefined;
                });

                afterEach(() => {
                    global.changeLocation = originalGlobalObj.changeLocation;
                });

                it('should call global changeLocation method', () => {
                    const result = createCallDecoratorBinding(errorResponse)();

                    result.subscribe(
                        () => {},
                        () => {
                            expect(global.changeLocation).toHaveBeenCalledWith('/sign-in');
                            expect(location.href).toEqual(originalWindowLocationHref);
                        }
                    );
                });
            });
        });

        describe('when response status is not equal to 401', () => {

            let errorResponse: any;

            beforeEach(() => {
                errorResponse = createBadRequest({
                    status: 500
                });
                spyOn(global, 'changeLocation');
            });

            afterEach(() => {
                global.changeLocation = originalGlobalObj.changeLocation;
            });

            it('should ignore unrelated error', () => {
                const result = createCallDecoratorBinding(errorResponse)();

                result.subscribe(
                    () => {},
                    () => {
                        expect(console.log).not.toHaveBeenCalled();
                        expect(global.changeLocation).not.toHaveBeenCalled();
                        expect(location.href).toEqual(originalWindowLocationHref);
                    }
                );
            });
        });
    });
});
