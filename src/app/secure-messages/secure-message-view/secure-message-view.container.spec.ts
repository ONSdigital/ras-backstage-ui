import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessageViewContainerComponent } from './secure-message-view.container';

import { createSecureMessage_server } from '../../../testing/create_SecureMessage';

let fixture: ComponentFixture<any>,
    comp: any,

    mockStore: any,
    mockOriginalSecureMessage: any,
    mockSecureMessagesActions: any,

    storeData: any = [];

const mockParamSecureMessageId = '100';

describe('SecureMessageViewContainerComponent', () => {

    beforeEach(async(() => {

        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(storeData);
            },
        };

        mockSecureMessagesActions = {
            replyToSecureMessage: function() {
                return {
                    subscribe: function () {}
                };
            },
            updateSingleMessageLabels: function() {
                return {
                    subscribe: function () {}
                };
            }
        };

        spyOn(mockSecureMessagesActions, 'replyToSecureMessage').and.callThrough();
        spyOn(mockSecureMessagesActions, 'updateSingleMessageLabels').and.callThrough();

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
    }));

    afterEach(async(() => {
        storeData = [];
    }));

    it('should initialise correctly', async(() => {
        fixture = TestBed.createComponent(SecureMessageViewContainerComponent);
        comp = fixture.debugElement.componentInstance;

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
            fixture = TestBed.createComponent(SecureMessageViewContainerComponent);
            comp = fixture.debugElement.componentInstance;

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

            it('should call updateSingleMessageLabels action on the SecureMessagesActions service', () => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    comp.markMessageRead_click_handler(new MouseEvent('click', {bubbles: true}));

                    expect(mockSecureMessagesActions.updateSingleMessageLabels).toHaveBeenCalled();
                });
            });
        });

        describe('and the reply has content', () => {

            beforeEach(async(() => {

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });

                comp.newSecureMessage.body = 'Some reply content';
            }));

            describe('and the sendReply_handler is invoked', () => {

                beforeEach(async(() => {
                    comp.sendReply_handler();
                }));

                it('should call replyToSecureMessage secure message action', async(() => {

                    expect(mockSecureMessagesActions.replyToSecureMessage).toHaveBeenCalled();
                    expect(mockSecureMessagesActions.replyToSecureMessage).toHaveBeenCalledWith({
                        thread_id: comp.originalSecureMessage.thread_id,
                        msg_to: comp.originalSecureMessage.msg_to[0],
                        msg_from: undefined,
                        subject: comp.originalSecureMessage.subject,
                        body: 'Some reply content',
                        collection_case: comp.originalSecureMessage.collection_case,
                        ru_id: comp.originalSecureMessage.ru_id,
                        survey: comp.originalSecureMessage.survey
                    });
                }));
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
    });

    describe('when the message being replied to is not found', () => {

        beforeEach(async(() => {
            fixture = TestBed.createComponent(SecureMessageViewContainerComponent);

            storeData = [];
        }));

        it('should log to console that it is not found', async(() => {

            spyOn(console, 'log').and.callThrough();

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

    /**
     * TODO - test routing after sending reply
     */
});
