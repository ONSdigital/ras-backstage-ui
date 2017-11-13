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

import { testMessageHasAggregatedData } from '../../../../testing-utils';

let fixture: ComponentFixture<any>,
    comp: any,

    mockSecureMessagesActions: any,
    mockStore: any,
    mockStore_observable: any,
    mockSecureMessagesActions_observable: any,

    storeDataStateMessage: any = null,
    apiData: any = {};

const originalConsoleLog = console.log;
const originalValidationOutput = global.validationOutput;

describe('SecureMessagesListContainerComponent', () => {

    beforeEach(() => {

        spyOn(console, 'log').and.callThrough();

        /**
         * Default if not reassigned
         */
        mockStore_observable = Observable.of(null);
        mockSecureMessagesActions_observable = Observable.of(apiData);

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
        apiData = {
            '_links': {},
            'messages': []
        };
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

                expect(comp.updateNavTabs).toHaveBeenCalled();
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

                apiData = {
                    '_links': {},
                    'messages': [
                    message1,
                    message2
                ]};

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

    describe('paginationUpdate [method]', () => {

        describe('when secure messages page links exist in the service', () => {

            let message1: any,
                message2: any;
            let link: String;
            let prevLink: any;
            let nextLink: any;

            beforeEach(() => {
                message1 = createSecureMessage_server('200');
                message2 = createSecureMessage_server('300');

                prevLink = {
                    label: '< Previous',
                    link: '',
                    queryParams: {'page': ''}
                };
                nextLink = {
                    label: 'Next >',
                    link: '',
                    queryParams: {'page': ''}
                };

                apiData = {
                    '_links': {
                        'prev': '',
                        'next': ''
                    },
                    'messages': [
                        message1,
                        message2
                    ]
                };

                mockSecureMessagesActions_observable = Observable.of(apiData);
            });

            it('should successfully assign them to the paginationLinks property', () => {
                fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    comp = fixture.debugElement.componentInstance;
                    link = comp.rootPathLink;
                    prevLink.link = link;
                    nextLink.link = link;
                    prevLink.queryParams.page = String(+comp.page - 1);
                    nextLink.queryParams.page = String(+comp.page + 1);
                    expect(mockSecureMessagesActions.retrieveAllSecureMessages).toHaveBeenCalled();
                    expect(comp.paginationLinks.length).toEqual(2);
                    expect(comp.paginationLinks).toEqual([prevLink, nextLink]);
                });
            });
        });
    });

    describe('updateNavTabs [method]', () => {

        describe('when no children exist on route', () => {

            it('should set navigation tab All to selected', () => {
                fixture = TestBed.createComponent(SecureMessagesListContainerComponent);
                comp = fixture.debugElement.componentInstance;
                comp.updateNavTabs();
                expect(comp.navigationTabs[0].selected).toBe(true);
                expect(comp.navigationTabs[1].selected).toBe(false);
                expect(comp.navigationTabs[2].selected).toBe(false);
                expect(comp.navigationTabs[3].selected).toBe(false);
            });
        });

        describe('when a child exist on route', () => {

            it('should set navigation tabs accordingly', () => {
                fixture = TestBed.createComponent(SecureMessagesListContainerComponent);
                comp = fixture.debugElement.componentInstance;
                comp.path = 'inbox';
                comp.updateNavTabs();
                expect(comp.navigationTabs[0].selected).toBe(false);
                expect(comp.navigationTabs[1].selected).toBe(true);
                expect(comp.navigationTabs[2].selected).toBe(false);
                expect(comp.navigationTabs[3].selected).toBe(false);
            });
        });
    });
});

testMessageHasAggregatedData(
    'messageHasAgreggateData [function]',
    messageHasAgreggateData,
    {
        '@msg_to': [
            {}
        ],
        '@msg_from': '',
        '@ru_id': ''
    });
