import { Observable } from 'rxjs/Rx';
import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationService } from '../authentication/authentication.service';
import { SecureMessagesService } from './secure-messages.service';
import { createSecureMessage_server, createSecureMessage_client } from '../../testing/create_SecureMessage';

let mockAuthenticationService: any,
    mockServerSecureMessage: any,
    mockClientSecureMessage: any;

describe('SecureMessagesService', () => {

    beforeEach(() => {

        mockAuthenticationService = {
            getToken() {
                console.log('here');
                return Observable.of('123').first();
            }
        };

        spyOn(mockAuthenticationService, 'getToken').and.callThrough();

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                SecureMessagesService,
                { provide: XHRBackend, useClass: MockBackend },
                { provide: AuthenticationService, useValue: mockAuthenticationService }
            ]
        });
    });

    it('should inject the service', inject([SecureMessagesService], (service: SecureMessagesService) => {
        expect(service).toBeTruthy();
    }));

    describe('createSecureMessage [method]', () => {

        it('should check authentication is set in headers',
            inject([SecureMessagesService],
                (secureMessagesService: SecureMessagesService) => {

                    mockClientSecureMessage = createSecureMessage_client();
                    secureMessagesService.createSecureMessage(mockClientSecureMessage).subscribe();

                    expect(mockAuthenticationService.getToken).toHaveBeenCalled();
                    expect(secureMessagesService.encryptedHeaders.get('Authorization')).toEqual('123');
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

                        secureMessagesService.createSecureMessage(mockClientSecureMessage).subscribe((serverResponse: any) => {
                            console.log('server res: ', serverResponse);
                            expect(serverResponse.json()).toEqual(mockServerSecureMessage);
                        });
                    }));

            it('should catch server error response',
                inject([SecureMessagesService, XHRBackend],
                    (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {
                        mockClientSecureMessage = createSecureMessage_client();

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        status: 404,
                                        body: {}
                                    })));
                        });

                        secureMessagesService.createSecureMessage(mockClientSecureMessage).subscribe(
                            (res: any) => {
                                expect(res.status).toEqual(404);
                            }
                        );
                    }));
        });

        /**
         * TODO - When user is not authenticated
         */
        /*describe('when user is not authenticated', () => {
        });*/
    });

    /*describe('getAllMessages [method]', () => {

        it('should check authentication is set in headers', () => {

        });

        describe('when user is authenticated', () => {

            it('should successfully GET a list of messages', () => {

            });

            it('should catch server error response', () => {

            });
        });

        /!**
         * TODO - When user is not authenticated
         *!/
        /!*describe('when user is not authenticated', () => {
         });*!/
    });*/

    /*describe('getMessage [method]', () => {

        it('should check authentication is set in headers', () => {

        });

        describe('when user is authenticated', () => {

            it('should successfully GET a single messages', () => {

            });

            it('should catch server error response', () => {

            });
        });

        /!**
         * TODO - When user is not authenticated
         *!/
        /!*describe('when user is not authenticated', () => {
         });*!/
    });*/

    /*describe('saveDraft [method]', () => {

        it('should check authentication is set in headers', () => {

        });

        describe('when user is authenticated', () => {

            it('should successfully POST a draft message', () => {

            });

            it('should catch server error response', () => {

            });
        });

        /!**
         * TODO - When user is not authenticated
         *!/
        /!*describe('when user is not authenticated', () => {
         });*!/
    });*/

    /*describe('updateDraft [method]', () => {

        it('should check authentication is set in headers', () => {

        });

        describe('when user is authenticated', () => {

            it('should successfully update and PUT a draft message', () => {

            });

            it('should catch server error response', () => {

            });
        });

        /!**
         * TODO - When user is not authenticated
         *!/
        /!*describe('when user is not authenticated', () => {
         });*!/
    });*/

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
