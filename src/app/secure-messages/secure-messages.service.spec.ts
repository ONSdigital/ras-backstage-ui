import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    ConnectionBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SecureMessagesService } from './secure-messages.service';
import { createSecureMessage_server } from '../../testing/create_SecureMessage';

// let mockSecureMessage: any;

describe('SecureMessagesService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                SecureMessagesService,
                { provide: ConnectionBackend, useClass: MockBackend },
            ]
        });
    });

    it('should inject the service', inject([SecureMessagesService], (service: SecureMessagesService) => {
        expect(service).toBeTruthy();
    }));

    /*describe('createSecureMessage [method]', () => {

        it('should check authentication is set in headers',
            inject([SecureMessagesService, ConnectionBackend],
                (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {

                    mockSecureMessage = createSecureMessage_server('100');

                    mockBackend.connections.subscribe((connection: any) => {
                        connection.mockRespond(
                            new Response(
                                new ResponseOptions({
                                    body: JSON.stringify(mockSecureMessage)
                                })));
                    });
                }));

        describe('when user is authenticated', () => {

            it('should successfully POST a secure message', () => {

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
