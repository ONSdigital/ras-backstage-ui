import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { createSecureMessage_server } from '../../../testing/create_SecureMessage';
import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessagesListContainerComponent } from './secure-messages-list.container';

import { NotificationListItem, NotificationStatus } from '../../shared/system-feedback/system-feedback.model';

let fixture: ComponentFixture<any>,
    comp: any,

    mockSecureMessagesActions: any,
    mockStore: any,

    storeDataStateMessage: any = null,
    apiData: any = [];

describe('SecureMessagesListContainerComponent', () => {

    beforeEach(() => {

        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(storeDataStateMessage);
            },
        };

        mockSecureMessagesActions = {
            retrieveAllSecureMessages: function() {
                return Observable.of(apiData);
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

    afterEach(async(() => {
        storeDataStateMessage = null;
        apiData = null;
    }));

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

    describe('when secure messages exist in the service', () => {

        it('should successfully assign them to the secureMessagesList property', () => {
            fixture = TestBed.createComponent(SecureMessagesListContainerComponent);

            const message1 = createSecureMessage_server('200'),
                message2 = createSecureMessage_server('300');

            apiData = [
                message1,
                message2
            ];

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                comp = fixture.debugElement.componentInstance;

                expect(mockSecureMessagesActions.retrieveAllSecureMessages).toHaveBeenCalled();
                expect(comp.secureMessagesList.length).not.toEqual(0);
                expect(comp.secureMessagesList).toEqual([message1, message2]);
            });
        });
    });
});
