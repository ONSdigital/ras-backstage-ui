import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessageViewContainerComponent } from './secure-message-view.container';

import { secureMessageHasAgreggateData } from './secure-message-view.container';

import { createSecureMessage_server } from '../../../testing/create_SecureMessage';

import { global } from '../../shared/utils';

let fixture: ComponentFixture<any>,
    comp: any,

    mockStore: any,
    mockOriginalSecureMessage: any,
    mockSecureMessagesActions: any,
    mockUserItems_observable: any,
    mockReplyToSecureMessage_observable: any,
    mockSaveDraft_observable: any,
    mockUpdateSingleMessageLabels_observable: any,

    storeData: any = [];

const mockParamSecureMessageId = '100';
const originalConsoleLog = console.log;
const originalValidationOutput = global.validationOutput;

describe('SecureMessageViewContainerComponent', () => {

    beforeEach(async(() => {

        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select(arr: Array<string>) {
                if (arr[0] === 'secureMessages' && arr[1] === 'items') {
                    return Observable.of(storeData);
                } else if (arr[0] === 'user' && arr[1] === 'item') {
                    return mockUserItems_observable || Observable.of({ id: '123' });
                }
            }
        };

        mockSecureMessagesActions = {
            replyToSecureMessage: function() {
                return mockReplyToSecureMessage_observable || Observable.of(null);
            },
            saveDraft: function() {
                return mockSaveDraft_observable || Observable.of(null);
            },
            updateSingleMessageLabels: function() {
                return mockUpdateSingleMessageLabels_observable || Observable.of(null);
            }
        };

        spyOn(console, 'log').and.callThrough();
        spyOn(mockSecureMessagesActions, 'replyToSecureMessage').and.callThrough();
        spyOn(mockSecureMessagesActions, 'updateSingleMessageLabels').and.callThrough();
        spyOn(mockSecureMessagesActions, 'saveDraft').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                SecureMessagesModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockStore },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({ 'secure-message-id': mockParamSecureMessageId })
                    }
                },
                { provide: SecureMessagesActions, useValue: mockSecureMessagesActions }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SecureMessageViewContainerComponent);
        comp = fixture.debugElement.componentInstance;
    }));

    afterEach(async(() => {
        storeData = [];
        console.log = originalConsoleLog;
    }));

    it('should initialise correctly', async(() => {
        spyOn(comp, 'subscribeToSecureMessageDataStore').and.callThrough();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp).toBeTruthy();
            expect(comp.originalSecureMessage).toEqual(undefined);
            expect(comp.newSecureMessage).toEqual(undefined);
            expect(comp.subscribeToSecureMessageDataStore).toHaveBeenCalled();
        });
    }));

    describe('when the message being replied to is found', () => {

        beforeEach(async(() => {
            mockOriginalSecureMessage = createSecureMessage_server('100');
            storeData = [mockOriginalSecureMessage];

            spyOn(comp, 'setMessages').and.callThrough();
            spyOn(comp, 'checkSetMessageIsRead').and.callThrough();
        }));

        it('should assign it as the originalSecureMessage property and create the newSecureMessage property from it',
            async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.originalSecureMessage).not.toEqual(null);
                    expect(comp.newSecureMessage).not.toEqual(null);
                    expect(comp.setMessages).toHaveBeenCalledWith(mockOriginalSecureMessage);
                });
            }));

        describe(('and secure message is unread'), () => {

            beforeEach(async(() => {
                mockOriginalSecureMessage.labels.push('UNREAD');
            }));

            afterEach(async(() => {
                mockOriginalSecureMessage.labels = [];
            }));

            it('should dispatch an action to update the original secure message labels to mark as read ', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.checkSetMessageIsRead).toHaveBeenCalled();
                    expect(mockSecureMessagesActions.updateSingleMessageLabels)
                        .toHaveBeenCalledWith(mockOriginalSecureMessage.msg_id, {
                            label: 'UNREAD',
                            action: 'remove'
                        });
                });
            }));
        });

        describe(('and secure message has already been read'), () => {

            it('should not dispatch an action to update the original secure message labels', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(mockSecureMessagesActions.updateSingleMessageLabels).not.toHaveBeenCalled();
                });
            }));
        });

        describe(('and markMessageRead_click_handler is invoked'), () => {

            const mouseEvt: any = new MouseEvent('click', {bubbles: true});

            let routerNavigateCache: any;

            beforeEach(() => {
                routerNavigateCache = comp.router.navigate;
                spyOn(comp.router, 'navigate');

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });
            });

            afterEach(() => {
                comp.router.navigate = routerNavigateCache;
            });

            it('should call updateSingleMessageLabels action on the SecureMessagesActions service', () => {
                comp.markMessageRead_click_handler(mouseEvt);

                expect(comp.router.navigate).toHaveBeenCalledWith(['/secure-messages']);
                expect(mockSecureMessagesActions.updateSingleMessageLabels).toHaveBeenCalled();
            });

            describe('when updateSingleMessageLabels fails', () => {

                const updateLabelsError = 'Error updating message labels';

                beforeEach(() => {
                    mockUpdateSingleMessageLabels_observable = Observable.throw(updateLabelsError);
                });

                afterEach(() => {
                    mockUpdateSingleMessageLabels_observable = undefined;
                });

                it('should handle error', () => {
                    comp.markMessageRead_click_handler(mouseEvt);

                    expect(comp.router.navigate).not.toHaveBeenCalled();
                    expect(console.log).toHaveBeenCalledWith('Error: ', updateLabelsError);
                });
            });
        });

        describe('and the reply has content', () => {

            beforeEach(() => {

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });

                comp.newSecureMessage.body = 'Some reply content';
            });

            describe('and the sendReply_handler is invoked', () => {

                let routerNavigateCache: any;

                beforeEach(() => {
                    routerNavigateCache = comp.router.navigate;
                    spyOn(comp.router, 'navigate');
                });

                afterEach(() => {
                    comp.router.navigate = routerNavigateCache;
                });

                it('should call replyToSecureMessage secure message action', async(() => {
                    comp.sendReply_handler();

                    expect(comp.router.navigate).toHaveBeenCalledWith(['/secure-messages']);
                    expect(mockSecureMessagesActions.replyToSecureMessage).toHaveBeenCalled();
                    expect(mockSecureMessagesActions.replyToSecureMessage).toHaveBeenCalledWith({
                        thread_id: comp.originalSecureMessage.thread_id,
                        msg_to: comp.originalSecureMessage.msg_to,
                        msg_from: '123',
                        subject: comp.originalSecureMessage.subject,
                        body: 'Some reply content',
                        collection_case: comp.originalSecureMessage.collection_case,
                        ru_id: comp.originalSecureMessage.ru_id,
                        survey: comp.originalSecureMessage.survey
                    });
                }));

                describe('when replyToSecureMessage fails', () => {

                    const replyError = 'Error sending reply';

                    beforeEach(() => {
                        mockReplyToSecureMessage_observable = Observable.throw(replyError);
                    });

                    afterEach(() => {
                        mockReplyToSecureMessage_observable = undefined;
                    });

                    it('should handle error', () => {
                        comp.sendReply_handler();

                        expect(comp.router.navigate).not.toHaveBeenCalled();
                        expect(console.log).toHaveBeenCalledWith('Error: ', replyError);
                    });
                });
            });
        });

        describe('and the saveDraft_handler is invoked', () => {

            let routerNavigateCache: any;

            beforeEach(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });

                routerNavigateCache = comp.router.navigate;
                spyOn(comp.router, 'navigate');
            });

            afterEach(() => {
                comp.router.navigate = routerNavigateCache;
            });

            it('should call saveDraft secure message action', async(() => {
                comp.saveDraft_handler({
                    preventDefault: function () {}
                });

                expect(comp.router.navigate).toHaveBeenCalledWith(['/secure-messages']);
                expect(mockSecureMessagesActions.saveDraft).toHaveBeenCalled();
                expect(mockSecureMessagesActions.saveDraft).toHaveBeenCalledWith({
                    thread_id: comp.originalSecureMessage.thread_id,
                    msg_to: comp.originalSecureMessage.msg_to,
                    msg_from: '123',
                    subject: comp.originalSecureMessage.subject,
                    body: '',
                    collection_case: comp.originalSecureMessage.collection_case,
                    ru_id: comp.originalSecureMessage.ru_id,
                    survey: comp.originalSecureMessage.survey
                });
            }));

            describe('when saveDraft fails', () => {

                const saveDraftError = 'Error sending reply';

                beforeEach(() => {
                    mockSaveDraft_observable = Observable.throw(saveDraftError);
                });

                afterEach(() => {
                    mockSaveDraft_observable = undefined;
                });

                it('should handle error', () => {
                    comp.saveDraft_handler({
                        preventDefault: function () {}
                    });

                    expect(comp.router.navigate).not.toHaveBeenCalled();
                    expect(console.log).toHaveBeenCalledWith('Error: ', saveDraftError);
                });
            });
        });

        describe('and the reply does not have content', () => {

            beforeEach(async(() => {

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });

                comp.newSecureMessage.body = '';
            }));

            describe('and the sendReply_handler is invoked', () => {

                beforeEach(async(() => {
                    comp.sendReply_handler();
                }));

                it('should not call replyToSecureMessage secure message action', () => {
                    expect(mockSecureMessagesActions.replyToSecureMessage).not.toHaveBeenCalled();
                });
            });
        });

        describe('resolveBreadcrumb [method]', () => {

            beforeEach(async(() => {

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });
            }));

            describe('when supplied valid data', () => {

                it('should return correct breadcrumb string label', () => {
                    const label = 'Test breadcrumb message';
                    expect(SecureMessageViewContainerComponent.resolveBreadcrumb({
                            exported: {
                                secureMessage: {
                                    subject: label
                                }
                            }
                        }))
                        .toEqual(label);
                });
            });

            describe('when supplied invalid data', () => {

                it('should return an empty string', () => {
                    expect(SecureMessageViewContainerComponent.resolveBreadcrumb({
                        exported: {}
                    }))
                    .toEqual('');

                    expect(SecureMessageViewContainerComponent.resolveBreadcrumb({
                        exported: {
                            secureMessage: {}
                        }
                    }))
                    .toEqual('');

                    expect(SecureMessageViewContainerComponent.resolveBreadcrumb({
                        exported: {
                            secureMessage: {
                                body: 'Test body'
                            }
                        }
                    }))
                    .toEqual('');
                });
            });
        });
    });

    describe('when the message being replied to is not found', () => {

        beforeEach(async(() => {
            storeData = [];
        }));

        it('should log to console that it is not found', async(() => {

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                expect(console.log).toHaveBeenCalledWith('Secure message with id "100" not found in store.');
            });
        }));

        it('should not call setMessages', async(() => {

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                spyOn(comp, 'setMessages').and.callThrough();

                expect(comp.setMessages).not.toHaveBeenCalled();
            });
        }));
    });

    describe('subscribeToRouteParams [method]', () => {

        describe('when route param subscription errors', () => {

            const routeParamErr = 'Error reading route params';
            let routeParamCache: any ;

            beforeEach(() => {
                routeParamCache = comp.route.params;
                comp.route.params = Observable.throw(routeParamErr);
            });

            afterEach(() => {
                comp.route.params = routeParamCache;
            });

            it('should log error to console', async(() => {
                spyOn(comp, 'subscribeToSecureMessageDataStore').and.callThrough();

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.subscribeToSecureMessageDataStore).not.toHaveBeenCalled();
                    expect(console.log).toHaveBeenCalledWith('Error: ', routeParamErr);
                });
            }));
        });
    });

    describe('subscribeToSecureMessageDataStore [method] ', () => {

        describe('when checking secure message in data store errors', () => {

            const dataStoreErr = 'Error reading secure message from data store';

            beforeEach(() => {
                comp.findSecureMessageDataStore = function () {
                    return Observable.throw(dataStoreErr);
                };
            });

            it('should log error to console', async(() => {
                spyOn(comp, 'originalSecureMessageUpdate').and.callThrough();

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.originalSecureMessageUpdate).not.toHaveBeenCalled();
                    expect(console.log).toHaveBeenCalledWith('Error: ', dataStoreErr);
                });
            }));
        });
    });

    describe('setMessages [method]', () => {

        let originalMessage: any;

        beforeEach(() => {
            originalMessage = createSecureMessage_server('500');
            originalMessage.msg_to = 'new-message-id';
        });

        describe('when the SENT label is present for a message', () => {

            beforeEach(() => {
                originalMessage.labels = ['SENT'];
            });

            it('should assign msg_to of the original message to the msg_to of the new message', async(() => {
                comp.setMessages(originalMessage);

                expect(comp.newSecureMessage.msg_to).toEqual(originalMessage.msg_to);
            }));
        });

        describe('when failing to retrieve a user item from the data store', () => {

            const userError = 'Error fetching user item';

            beforeEach(() => {
                mockUserItems_observable = Observable.throw(userError);
            });

            it('should handle subscription error', async(() => {
                comp.setMessages(originalMessage);

                expect(console.log).toHaveBeenCalledWith('Error: ', userError);
                expect(comp.newSecureMessage.msg_from).toEqual('');
                expect(comp.user).toEqual(undefined);
            }));
        });
    });
});

describe('secureMessageHasAgreggateData [function]', () => {

    let message: any;

    afterEach(() => {
        message = undefined;
    });

    describe('when message has aggregated data', () => {

        beforeEach(() => {

            message = {
                '@msg_to': [
                    {}
                ],
                '@msg_from': '',
                '@ru_id': ''
            };
        });

        it('should return true', () => {
            expect(secureMessageHasAgreggateData(message)).toEqual(true);
        });
    });

    describe('when message does not have aggregated data', () => {

        beforeEach(() => {

            message = {
                '@msg_to': [
                    {}
                ]
            };
        });

        it('should return false', () => {
            expect(secureMessageHasAgreggateData(message)).toEqual(false);
        });

        describe('and has empty @msg_to array', () => {

            beforeEach(() => {

                message = {
                    '@msg_to': []
                };

                spyOn(global, 'validationOutput').and.callThrough();
            });

            afterEach(() => {
                global.validationOutput = originalValidationOutput;
            });

            it('should call global validationOutput [method]', () => {

                expect(secureMessageHasAgreggateData(message)).toEqual(false);
                expect(global.validationOutput).toHaveBeenCalledWith({
                    notification: 'Property @msg_to array empty',
                    subject: message
                });
            });
        });
    });
});
