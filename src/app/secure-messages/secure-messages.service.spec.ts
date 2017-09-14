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

import { checkCatchServerError } from '../../../testing-utils';

let mockAuthenticationService: any,
    mockServerSecureMessage: any,
    mockClientSecureMessage: any,
    mockServiceCall: any;

describe('SecureMessagesService', () => {

    beforeEach(() => {

        mockAuthenticationService = {
            encryptedHeaders: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                SecureMessagesService,
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

    describe('getAllMessages [method]', () => {

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

    describe('getMessage [method]', () => {

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

    describe('saveDraft [method]', () => {

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

    describe('updateDraft [method]', () => {

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
});
