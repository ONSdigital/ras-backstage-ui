import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { createSecureMessage_server } from '../../../testing/create_SecureMessage';
import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessagesListContainerComponent, messageHasAgreggateData } from './secure-messages-list.container';

import { NotificationListItem, NotificationStatus } from '../../shared/system-feedback/system-feedback.model';

import { global } from '../../shared/utils';

let fixture: ComponentFixture<any>,
    comp: any,

    mockSecureMessagesActions: any,
    mockStore: any,
    mockStore_observable: any,
    mockSecureMessagesActions_observable: any,

    storeDataStateMessage: any = null,
    apiData: any = [];

const originalConsoleLog = console.log;
const originalValidationOutput = global.validationOutput;

describe('SecureMessagesListContainerComponent', () => {

    beforeEach(() => {

        spyOn(console, 'log').and.callThrough();

        /**
         * Default if not reassigned
         */
        mockStore_observable = Observable.of(null);
        mockSecureMessagesActions_observable = Observable.of([]);

        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return mockStore_observable;
            },
        };

        mockSecureMessagesActions = {
            retrieveAllSecureMessages: function() {
                return mockSecureMessagesActions_observable;
            },
            viewAllMessages() {}
        };

        spyOn(mockStore, 'select').and.callThrough();
        spyOn(mockSecureMessagesActions, 'retrieveAllSecureMessages').and.callThrough();
        spyOn(mockSecureMessagesActions, 'viewAllMessages').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                SecureMessagesModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockStore },
                { provide: SecureMessagesActions, useValue: mockSecureMessagesActions }
            ]
        })
            .compileComponents();
    });

    afterEach(() => {
        storeDataStateMessage = null;
        apiData = null;
        console.log = originalConsoleLog;
    });

    describe('ngOnInit [method]', () => {

        it('should initialise correctly', () => {
            fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

            storeDataStateMessage = null;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                comp = fixture.debugElement.componentInstance;

                expect(comp).toBeTruthy();
                expect(comp.secureMessagesList.length).toEqual(0);
                expect(comp.hasSystemFeedback).toEqual(false);
                expect(comp.systemNotifications.length).toEqual(0);

                expect(mockStore.select).toHaveBeenCalledWith(['secureMessages', 'stateMessage']);
                expect(mockSecureMessagesActions.viewAllMessages).toHaveBeenCalled();
                expect(mockSecureMessagesActions.retrieveAllSecureMessages).toHaveBeenCalled();
            });
        });

        describe('when a status message exists', () => {

            it('should create and assign a system feedback message', () => {
                fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                storeDataStateMessage = {
                    notification: 'Test notification',
                    action: {
                        label: 'Action label',
                        link: '/secure-messages/message/100'
                    }
                };

                mockStore_observable = Observable.of(storeDataStateMessage);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const notificationItemResult: NotificationListItem = NotificationListItem.create({
                        label: 'Test notification',
                        action: {
                            label: 'Action label',
                            link: '/secure-messages/message/100'
                        },
                        status: NotificationStatus.success
                    });

                    comp = fixture.debugElement.componentInstance;

                    expect(comp.systemNotifications).toEqual([notificationItemResult]);
                });
            });
        });

        describe('when stateMessage property does not exist in state', () => {

            beforeEach(() => {
                mockStore_observable = Observable.throw('Error getting stateMessage');
            });

            it('should log an error to console', () => {
                fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    comp = fixture.debugElement.componentInstance;

                    expect(console.log).toHaveBeenCalledWith('Error: ', 'Error getting stateMessage');
                });
            });
        });

        describe('when secureMessagesActions retrieveAllSecureMessages fails to return messages', () => {

            beforeEach(() => {
                mockSecureMessagesActions_observable = Observable.throw('Error getting secureMessagesList');
            });

            it('should log an error to console', () => {
                fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    comp = fixture.debugElement.componentInstance;

                    expect(console.log).toHaveBeenCalledWith('Error: ', 'Error getting secureMessagesList');
                });
            });
        });
    });

    describe('secureMessageListUpdate [method]', () => {

        describe('when secure messages exist in the service', () => {

            let message1: any,
                message2: any;

            beforeEach(() => {
                message1 = createSecureMessage_server('200');
                message2 = createSecureMessage_server('300');

                apiData = [
                    message1,
                    message2
                ];

                mockSecureMessagesActions_observable = Observable.of(apiData);
            });

            it('should successfully assign them to the secureMessagesList property', () => {
                fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    comp = fixture.debugElement.componentInstance;

                    expect(mockSecureMessagesActions.retrieveAllSecureMessages).toHaveBeenCalled();
                    expect(comp.secureMessagesList.length).not.toEqual(0);
                    expect(comp.secureMessagesList).toEqual([message1, message2]);
                });
            });

            describe('and labels property is missing on a message', () => {

                beforeEach(() => {
                    delete message2.labels;
                });

                it('should log console error', () => {
                    fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        comp = fixture.debugElement.componentInstance;

                        expect(console.log).toHaveBeenCalledWith('labels property missing on msg: ', message2);
                    });
                });
            });

            describe('and message is labelled as DRAFT', () => {

                beforeEach(() => {
                    message2.labels = ['DRAFT'];
                });

                it('should assign the $isDraft property', () => {
                    fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        comp = fixture.debugElement.componentInstance;

                        expect(message2['$isDraft']).toEqual(true);
                    });
                });
            });

            describe('and message is labelled as UNREAD', () => {

                beforeEach(() => {
                    message2.labels = ['UNREAD'];
                });

                it('should assign the $isUnread property', () => {
                    fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        comp = fixture.debugElement.componentInstance;

                        expect(message2['$isUnread']).toEqual(true);
                    });
                });
            });
        });

        describe('when secure messages do not exist in the service', () => {

            it('should return undefined', () => {
                fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    comp = fixture.debugElement.componentInstance;

                    expect(comp.secureMessageListUpdate(undefined))
                        .toEqual(undefined);
                });
            });
        });
    });
});

describe('messageHasAgreggateData [function]', () => {

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
            expect(messageHasAgreggateData(message)).toEqual(true);
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
            expect(messageHasAgreggateData(message)).toEqual(false);
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

                expect(messageHasAgreggateData(message)).toEqual(false);
                expect(global.validationOutput).toHaveBeenCalledWith({
                    notification: 'Property @msg_to array empty',
                    subject: message
                });
            });
        });
    });
});
