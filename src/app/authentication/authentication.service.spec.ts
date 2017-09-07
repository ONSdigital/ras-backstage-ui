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

import { AuthenticationService } from './authentication.service';

let mockRouter: any,
    mockActivatedRoute: any;

const originalConsoleLog: any = console.log;

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
        spyOn(console, 'log');
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
                    spyOn(window.sessionStorage, 'getItem')

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
});
