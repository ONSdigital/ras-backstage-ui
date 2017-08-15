import { Observable } from 'rxjs/Rx';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
    Headers,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationService } from '../authentication/authentication.service';
import { SecureMessagesService } from './secure-messages.service';
import {
    createSecureMessage_server,
    createSecureMessage_client,
    createDraftMessage_client,
    createDraftMessage_server
} from '../../testing/create_SecureMessage';

let mockRouter: any,
    mockAuthenticationService: any,
    mockServerSecureMessage: any,
    mockClientSecureMessage: any,
    mockServiceCall: any;


function checkFirstAuthentication () {
    mockServiceCall.subscribe();
    expect(mockAuthenticationService.authenticate).toHaveBeenCalled();
}

function checkCatchServerError (observable: Observable<any>, mockBackend: MockBackend) {

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
    });

    observable.subscribe(
        () => {},
        (err: any) => {
            expect(err.ok).toEqual(false);
            expect(err.status).toEqual(500);
            expect(err.statusText).toEqual('');
            expect(err.type).toEqual(3);
            expect(err.url).toEqual(null);
        }
    );
}


describe('SecureMessagesService', () => {

    beforeEach(() => {

        mockAuthenticationService = {
            authenticate(observableMethod: any) {
                console.log('authenticate observableMethod: ', observableMethod);
                return observableMethod();
            }
        };

        mockRouter = {
            navigate: function () {}
        };

        spyOn(mockRouter, 'navigate');
        spyOn(mockAuthenticationService, 'authenticate').and.callThrough();

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                SecureMessagesService,
                { provide: Router, useValue: mockRouter },
                { provide: XHRBackend, useClass: MockBackend },
                { provide: AuthenticationService, useValue: mockAuthenticationService }
            ]
        });
    });

    afterEach(() => {
        mockAuthenticationService = undefined;
        mockServerSecureMessage = undefined;
        mockClientSecureMessage = undefined;
        mockServiceCall = undefined;
    });

    it('should inject the service', inject([SecureMessagesService], (service: SecureMessagesService) => {
        expect(service).toBeTruthy();
    }));

    describe('createSecureMessage [method]', () => {

        it('should call authenticate with AuthenticationService',
            inject([SecureMessagesService],
                (secureMessagesService: SecureMessagesService) => {
                    mockClientSecureMessage = createSecureMessage_client();
                    mockServiceCall = secureMessagesService.createSecureMessage(mockClientSecureMessage);
                    checkFirstAuthentication();
                }));

        describe('when user is authenticated', () => {

            it('should successfully POST a secure message',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {
                        mockClientSecureMessage = createSecureMessage_client();
                        mockServerSecureMessage = createSecureMessage_server('100');

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        body: JSON.stringify(mockServerSecureMessage)
                                    })));
                                });

                        mockServiceCall = secureMessagesService.createSecureMessage(mockClientSecureMessage);

                        mockServiceCall.subscribe((serverResponse: any) => {
                            console.log('serverResponse: ', serverResponse);
                            expect(serverResponse.json()).toEqual(mockServerSecureMessage);
                        });
                    }));

            it('should catch server error response',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {
                        mockClientSecureMessage = createSecureMessage_client();

                        checkCatchServerError(
                            secureMessagesService.createSecureMessage(mockClientSecureMessage),
                            mockBackend);
                    }));
        });

        /**
         * TODO - When user is not authenticated
         */
        /*describe('when user is not authenticated', () => {
        });*/
    });

    describe('getAllMessages [method]', () => {

        it('should call authenticate with AuthenticationService',
            inject([SecureMessagesService],
                (secureMessagesService: SecureMessagesService) => {
                    mockServiceCall = secureMessagesService.getAllMessages();
                    checkFirstAuthentication();
                }));

        describe('when user is authenticated', () => {

            it('should successfully GET a list of messages',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {

                        const message1: any = createSecureMessage_server('200'),
                            message2: any = createSecureMessage_server('300');

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        body: JSON.stringify([
                                            message1,
                                            message2
                                        ])
                                    })));
                        });

                        mockServiceCall = secureMessagesService.getAllMessages();

                        mockServiceCall.subscribe((serverResponse: any) => {
                            const resJSON = serverResponse.json();
                            expect(resJSON[0]).toEqual(message1);
                            expect(resJSON[1]).toEqual(message2);
                        });
                    }));

            it('should catch server error response',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {
                        checkCatchServerError(secureMessagesService.getAllMessages(), mockBackend);
                    }));
        });

        /**
         * TODO - When user is not authenticated
         */
        /*describe('when user is not authenticated', () => {
        });*/
    });

    describe('getMessage [method]', () => {

        it('should call authenticate with AuthenticationService',
            inject([SecureMessagesService],
                (secureMessagesService: SecureMessagesService) => {
                    mockServiceCall = secureMessagesService.getMessage('789');
                    checkFirstAuthentication();
                }));

        describe('when user is authenticated', () => {

            it('should successfully GET a single messages',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {

                        mockServerSecureMessage = createSecureMessage_server('400');

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        body: JSON.stringify(mockServerSecureMessage)
                                    })));
                        });

                        mockServiceCall = secureMessagesService.getMessage('400');

                        mockServiceCall.subscribe((serverResponse: any) => {
                            const resJSON = serverResponse.json();
                            expect(resJSON).toEqual(mockServerSecureMessage);
                        });
                    }));

            it('should catch server error response',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {
                        checkCatchServerError(secureMessagesService.getMessage('123'), mockBackend);
                    }));
        });

        /**
         * TODO - When user is not authenticated
         */
        /*describe('when user is not authenticated', () => {
        });*/
    });

    describe('saveDraft [method]', () => {

        it('should call authenticate with AuthenticationService',
            inject([SecureMessagesService],
                (secureMessagesService: SecureMessagesService) => {
                    mockServiceCall = secureMessagesService.saveDraft(null);
                    checkFirstAuthentication();
                }));

        describe('when user is authenticated', () => {

            it('should successfully POST a draft message',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {

                        const mockClientDraft = createDraftMessage_client(),
                            mockServerDraftSuccess = {
                                msg_id: '500',
                                status: 'OK',
                                thread_id: 'thread123'
                            };

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        body: JSON.stringify(mockServerDraftSuccess)
                                    })));
                        });

                        mockServiceCall = secureMessagesService.saveDraft(mockClientDraft);

                        mockServiceCall.subscribe((serverResponse: any) => {
                            const resJSON = serverResponse.json();
                            expect(resJSON).toEqual(mockServerDraftSuccess);
                        });
                    }));

            it('should catch server error response',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {
                        checkCatchServerError(secureMessagesService.saveDraft(null), mockBackend);
                    }));
        });

        /**
         * TODO - When user is not authenticated
         */
        /*describe('when user is not authenticated', () => {
         });*/
    });

    describe('updateDraft [method]', () => {

        it('should call authenticate with AuthenticationService',
            inject([SecureMessagesService],
                (secureMessagesService: SecureMessagesService) => {
                    mockServiceCall = secureMessagesService.updateDraft('987', null);
                    checkFirstAuthentication();
                }));

        describe('when user is authenticated', () => {

            it('should successfully update and PUT a draft message',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {

                        const mockServerDraft = createDraftMessage_server('600');

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        body: JSON.stringify('Updated')
                                    })));
                        });

                        mockServiceCall = secureMessagesService.updateDraft('600', mockServerDraft);

                        mockServiceCall.subscribe((serverResponse: any) => {
                                const resJSON = serverResponse.json();
                                expect(resJSON).toEqual('Updated');
                            });
                    }));

            it('should catch server error response',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {
                        checkCatchServerError(secureMessagesService.updateDraft('456', null), mockBackend);
                    }));
        });

        /**
         * TODO - When user is not authenticated
         */
        /*describe('when user is not authenticated', () => {
         });*/
    });

    /**
     * TODO - Refactor/test after security architecture has been decided
     */
    /*describe('authenticate [method]', () => {
    });*/

    /**
     * TODO - Refactor/test after security architecture has been decided
     */
    /*describe('isAuthenticated [method]', () => {
    });*/
});
