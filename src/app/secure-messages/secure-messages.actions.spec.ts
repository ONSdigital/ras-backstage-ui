import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, async, inject } from '@angular/core/testing';
import { SecureMessagesActions } from './secure-messages.actions';
import { SecureMessagesService } from './secure-messages.service';
import { SecureMessage } from './shared/secure-message.model';

import {
    createSecureMessage_client,
    createSecureMessage_server,
    createDraftMessage_client,
    createDraftMessage_server
} from '../../testing/create_SecureMessage';

let mockSecureMessageService: any,
    mockReduxStore: any,
    mockObservable_response: any,
    successResponse: any = {},
    failResponse = 'Erroring';

const originalLog = console.log;

describe('SecureMessagesActions', () => {

    beforeEach(() => {

        mockReduxStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {}
        };

        mockSecureMessageService = {
            createSecureMessage () {
                return mockObservable_response;
            },
            getMessage () {
                return mockObservable_response;
            },
            getAllMessages () {
                return mockObservable_response;
            },
            saveDraft () {
                return mockObservable_response;
            },
            updateDraft () {
                return mockObservable_response;
            },
            updateMessageLabels () {
                return mockObservable_response;
            }
        };

        spyOn(console, 'log');
        spyOn(mockReduxStore, 'dispatch');
        spyOn(mockSecureMessageService, 'createSecureMessage').and.callThrough();
        spyOn(mockSecureMessageService, 'getMessage').and.callThrough();
        spyOn(mockSecureMessageService, 'getAllMessages').and.callThrough();
        spyOn(mockSecureMessageService, 'saveDraft').and.callThrough();
        spyOn(mockSecureMessageService, 'updateDraft').and.callThrough();
        spyOn(mockSecureMessageService, 'updateMessageLabels').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule
            ],
            providers: [
                SecureMessagesActions,
                { provide: NgRedux, useValue: mockReduxStore },
                { provide: SecureMessagesService, useValue: mockSecureMessageService }
            ]
        });
    });

    afterEach(() => {
        mockSecureMessageService = undefined;
        mockObservable_response = undefined;
        mockReduxStore = undefined;
        successResponse = {};
        failResponse = 'Erroring';

        console.log = originalLog;
    });

    it('should be injected',
        inject([SecureMessagesActions],
            (secureMessagesActions: SecureMessagesActions) => {
                expect(secureMessagesActions).toBeTruthy();
            }));

    describe('createSecureMessage [method]', () => {

        it('should dispatch ' + SecureMessagesActions.CREATE_SINGLE  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    mockObservable_response = Observable.of({});

                    secureMessagesActions.createSecureMessage(createSecureMessage_client()).subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalled();
                }));

        it('should call secureMessagesService createSecureMessage method to create a new message',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    mockObservable_response = Observable.of({});

                    const secureMessage: SecureMessage = createSecureMessage_client();
                    secureMessagesActions.createSecureMessage(secureMessage).subscribe();

                    expect(mockSecureMessageService.createSecureMessage).toHaveBeenCalledWith(secureMessage);
                }));

        describe('after successfully creating a message', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call createdSecureMessage',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        const secureMessage: SecureMessage = createSecureMessage_client();

                        spyOn(secureMessagesActions, 'createdSecureMessage');

                        secureMessagesActions.createSecureMessage(secureMessage).subscribe();

                        expect(secureMessagesActions.createdSecureMessage).toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to create a message', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        const secureMessage: SecureMessage = createSecureMessage_client();

                        secureMessagesActions.createSecureMessage(secureMessage).subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch createdSecureMessage action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('createdSecureMessage [method]', () => {

        it('should dispatch ' + SecureMessagesActions.CREATED_SINGLE  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    secureMessagesActions.createdSecureMessage({ something: 'here' });

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.CREATED_SINGLE,
                        payload: {
                            something: 'here'
                        }
                    });
                }));
    });

    describe('replyToSecureMessage [method]', () => {

        it('should dispatch ' + SecureMessagesActions.REPLY_SINGLE  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    mockObservable_response = Observable.of({});

                    const secureMessage: SecureMessage = createSecureMessage_server('123');

                    secureMessagesActions.replyToSecureMessage(secureMessage).subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.REPLY_SINGLE,
                        payload: secureMessage
                    });
                }));

        it('should call secureMessagesService createSecureMessage method to create a message reply',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    mockObservable_response = Observable.of({});

                    const secureMessage: SecureMessage = createSecureMessage_client();
                    secureMessagesActions.replyToSecureMessage(secureMessage).subscribe();

                    expect(mockSecureMessageService.createSecureMessage).toHaveBeenCalledWith(secureMessage);
                }));

        describe('after successfully creating a message reply', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call repliedToSecureMessage',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        const secureMessage: SecureMessage = createSecureMessage_client();

                        spyOn(secureMessagesActions, 'repliedToSecureMessage');

                        secureMessagesActions.replyToSecureMessage(secureMessage).subscribe();

                        expect(secureMessagesActions.repliedToSecureMessage).toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to create a message reply', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        const secureMessage: SecureMessage = createSecureMessage_client();

                        secureMessagesActions.replyToSecureMessage(secureMessage).subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch repliedToSecureMessage action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('repliedToSecureMessage [method]', () => {

        it('should dispatch ' + SecureMessagesActions.REPLIED_SINGLE  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    secureMessagesActions.repliedToSecureMessage({ something: 'here' });

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.REPLIED_SINGLE,
                        payload: {
                            something: 'here'
                        }
                    });
                }));
    });

    describe('retrieveSecureMessage [method]', () => {

        it('should dispatch ' + SecureMessagesActions.RETRIEVE_SINGLE  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    mockObservable_response = Observable.of({
                        json () {
                            return createSecureMessage_server('100');
                        }
                    });

                    secureMessagesActions.retrieveSecureMessage('100').subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.RETRIEVE_SINGLE,
                        id: '100'
                    });
                }));

        it('should call secureMessagesService getMessage method to get a message from the service',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const id = '200';
                    mockObservable_response = Observable.of({
                        json () {
                            return createSecureMessage_server(id);
                        }
                    });

                    secureMessagesActions.retrieveSecureMessage(id).subscribe();

                    expect(mockSecureMessageService.getMessage).toHaveBeenCalledWith(id);
                }));

        describe('after successfully getting a message', () => {

            beforeEach(() => {
                successResponse = createSecureMessage_server('300');
                mockObservable_response = Observable.of({
                    json () {
                        return successResponse;
                    }
                });
            });

            it('should call receivedSecureMessage',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        spyOn(secureMessagesActions, 'receivedSecureMessage');

                        secureMessagesActions.retrieveSecureMessage('300').subscribe();

                        expect(secureMessagesActions.receivedSecureMessage).toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to get a message', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        secureMessagesActions.retrieveSecureMessage('300').subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch receivedSecureMessage action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('receivedSecureMessage [method]', () => {

        it('should dispatch ' + SecureMessagesActions.RECEIVED_SINGLE  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const secureMessage = createSecureMessage_server('400');

                    secureMessagesActions.receivedSecureMessage(secureMessage);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.RECEIVED_SINGLE,
                        secureMessage: secureMessage
                    });
                }));

    });

    describe('retrieveAllSecureMessages [method]', () => {

        it('should dispatch ' + SecureMessagesActions.RETRIEVE_ALL  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    mockObservable_response = Observable.of({
                        json<T> () {
                            return {
                                messages: [
                                    createSecureMessage_server('500')
                                ]
                            };
                        }
                    });

                    secureMessagesActions.retrieveAllSecureMessages().subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.RETRIEVE_ALL
                    });
                }));

        it('should call secureMessagesService getAllMessages method to get a list of messages from the service',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    mockObservable_response = Observable.of({
                        json<T> () {
                            return {
                                messages: [
                                    createSecureMessage_server('600')
                                ]
                            };
                        }
                    });

                    secureMessagesActions.retrieveAllSecureMessages().subscribe();

                    expect(mockSecureMessageService.getAllMessages).toHaveBeenCalled();
                }));

        describe('after successfully getting all messages', () => {

            beforeEach(() => {
                successResponse = {
                    messages: [
                        createSecureMessage_server('700')
                    ]
                };
                mockObservable_response = Observable.of({
                    json<T> () {
                        return successResponse;
                    }
                });
            });

            it('should call receivedAllSecureMessages',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        spyOn(secureMessagesActions, 'receivedAllSecureMessages');

                        secureMessagesActions.retrieveAllSecureMessages().subscribe();

                        expect(secureMessagesActions.receivedAllSecureMessages)
                            .toHaveBeenCalledWith(successResponse.messages);
                    }));
        });

        describe('after failing to get all messages', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        secureMessagesActions.retrieveAllSecureMessages().subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch receivedAllSecureMessages action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('receivedAllSecureMessages [method]', () => {

        it('should dispatch ' + SecureMessagesActions.RECEIVED_ALL  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const secureMessages = [
                        createSecureMessage_server('800'),
                        createSecureMessage_server('900')
                    ];

                    secureMessagesActions.receivedAllSecureMessages(secureMessages);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.RECEIVED_ALL,
                        payload: secureMessages
                    });
                }));
    });

    describe('saveDraft [method]', () => {

        it('should dispatch ' + SecureMessagesActions.DRAFT_SAVE  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const draftMessage = createDraftMessage_client();
                    mockObservable_response = Observable.of(successResponse);

                    secureMessagesActions.saveDraft(draftMessage).subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.DRAFT_SAVE,
                        draftMessage: draftMessage
                    });
                }));

        it('should call secureMessagesService saveDraft method to save a draft message',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const draftMessage = createDraftMessage_client();
                    mockObservable_response = Observable.of({});

                    secureMessagesActions.saveDraft(draftMessage).subscribe();

                    expect(mockSecureMessageService.saveDraft).toHaveBeenCalledWith(draftMessage);
                }));

        describe('after successfully saving a draft message', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call savedDraft',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        const draftMessage = createDraftMessage_client();
                        spyOn(secureMessagesActions, 'savedDraft');

                        secureMessagesActions.saveDraft(draftMessage).subscribe();

                        expect(secureMessagesActions.savedDraft).toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to save a draft message', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        spyOn(secureMessagesActions, 'savedDraft');

                        secureMessagesActions.saveDraft(createSecureMessage_server('1100')).subscribe(
                            () => {},
                            () => {
                                expect(secureMessagesActions.savedDraft).not.toHaveBeenCalled();
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch savedDraft action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('savedDraft [method]', () => {

        it('should dispatch ' + SecureMessagesActions.DRAFT_SAVED  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    secureMessagesActions.savedDraft(successResponse);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.DRAFT_SAVED,
                        payload: successResponse
                    });
                }));
    });

    describe('updateDraft [method]', () => {

        it('should dispatch ' + SecureMessagesActions.DRAFT_UPDATE  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const draftMessage = createDraftMessage_server('1200');
                    mockObservable_response = Observable.of(successResponse);

                    secureMessagesActions.updateDraft(draftMessage).subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.DRAFT_UPDATE,
                        draftMessage: draftMessage
                    });
                }));

        it('should call secureMessagesService updateDraft method to update a draft message',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const draftMessage = createDraftMessage_server('1300');
                    mockObservable_response = Observable.of({});

                    secureMessagesActions.updateDraft(draftMessage).subscribe();

                    expect(mockSecureMessageService.updateDraft).toHaveBeenCalledWith(draftMessage.msg_id, draftMessage);
                }));

        describe('after successfully updating a draft message', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call updatedDraft',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        const draftMessage = createDraftMessage_server('1400');
                        spyOn(secureMessagesActions, 'updatedDraft');

                        secureMessagesActions.updateDraft(draftMessage).subscribe();

                        expect(secureMessagesActions.updatedDraft).toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to update a draft message', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        spyOn(secureMessagesActions, 'updatedDraft');

                        secureMessagesActions.updateDraft(createDraftMessage_server('1500')).subscribe(
                            () => {},
                            () => {
                                expect(secureMessagesActions.updatedDraft).not.toHaveBeenCalled();
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch updatedDraft action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('updatedDraft [method]', () => {

        it('should dispatch ' + SecureMessagesActions.DRAFT_UPDATED  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    secureMessagesActions.updatedDraft(successResponse);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.DRAFT_UPDATED,
                        payload: successResponse
                    });
                }));
    });

    describe('viewAllMessages [method]', () => {

        it('should dispatch ' + SecureMessagesActions.VIEW_ALL  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    secureMessagesActions.viewAllMessages();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.VIEW_ALL
                    });
                }));
    });

    describe('updateSingleMessageLabels [method]', () => {

        it('should dispatch ' + SecureMessagesActions.UPDATE_SINGLE_LABELS  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const id = '1700';
                    mockObservable_response = Observable.of(successResponse);
                    secureMessagesActions.updateSingleMessageLabels(id, ['INBOX']).subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.UPDATE_SINGLE_LABELS,
                        secureMessageId: id
                    });
                }));

        it('should call secureMessagesService updateMessageLabels method to update message labels',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const id = '1800',
                        labels = ['INBOX'];

                    mockObservable_response = Observable.of({});

                    secureMessagesActions.updateSingleMessageLabels(id, labels).subscribe();

                    expect(mockSecureMessageService.updateMessageLabels).toHaveBeenCalledWith(id, labels);
                }));

        describe('after successfully updating a messages labels', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call updatedSingleMessageLabels',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        const id = '1800',
                            labels = ['INBOX'];

                        spyOn(secureMessagesActions, 'updatedSingleMessageLabels');

                        secureMessagesActions.updateSingleMessageLabels(id, labels).subscribe();

                        expect(secureMessagesActions.updatedSingleMessageLabels).toHaveBeenCalledWith(id, labels);
                    }));
        });

        describe('after failing to update a messages labels', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([SecureMessagesActions],
                    (secureMessagesActions: SecureMessagesActions) => {
                        const id = '1800',
                            labels = ['INBOX'];

                        spyOn(secureMessagesActions, 'updatedSingleMessageLabels');

                        secureMessagesActions.updateSingleMessageLabels(id, labels).subscribe(
                            () => {},
                            () => {
                                expect(secureMessagesActions.updatedSingleMessageLabels).not.toHaveBeenCalled();
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch updatedSingleMessageLabels action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('updatedSingleMessageLabels [method]', () => {

        it('should dispatch ' + SecureMessagesActions.UPDATED_SINGLE_LABELS  + ' redux action',
            inject([SecureMessagesActions],
                (secureMessagesActions: SecureMessagesActions) => {
                    const id = '1600',
                        labels = ['INBOX'];

                    spyOn(secureMessagesActions, 'retrieveSecureMessage');

                    secureMessagesActions.updatedSingleMessageLabels(id, labels);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SecureMessagesActions.UPDATED_SINGLE_LABELS,
                        secureMessageId: id,
                        labels: labels
                    });
                    expect(secureMessagesActions.retrieveSecureMessage).toHaveBeenCalled();
                }));
    });
});
