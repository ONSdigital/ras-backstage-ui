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
            }
        };

        spyOn(mockSecureMessagesActions, 'replyToSecureMessage').and.callThrough();

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
                        params: Observable.of({ 'secure-message-id': '100' })
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

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
        });

        comp = fixture.debugElement.componentInstance;

        expect(comp).toBeTruthy();
        expect(comp.originalSecureMessage).toEqual(undefined);
        expect(comp.newSecureMessage).toEqual(undefined);
    }));

    describe('when the message being replied to is found', () => {

        beforeEach(async(() => {
            fixture = TestBed.createComponent(SecureMessageViewContainerComponent);
            comp = fixture.debugElement.componentInstance;

            mockOriginalSecureMessage = createSecureMessage_server('100');
            storeData = [mockOriginalSecureMessage];

            spyOn(comp, 'setMessages').and.callThrough();
        }));

        it('should assign it as the originalSecureMessage property and create the newSecureMessage property from it',
            async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });

                expect(comp.originalSecureMessage).not.toEqual(null);
                expect(comp.newSecureMessage).not.toEqual(null);
                expect(comp.setMessages).toHaveBeenCalledWith(mockOriginalSecureMessage);
            }));

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
                        urn_to: comp.originalSecureMessage.urn_to[0],
                        urn_from: undefined,
                        subject: comp.originalSecureMessage.subject,
                        body: 'Some reply content',
                        collection_case: comp.originalSecureMessage.collection_case,
                        reporting_unit: comp.originalSecureMessage.reporting_unit,
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
            });

            expect(console.log).toHaveBeenCalledWith('Secure message with id "100" not found in store.');
        }));

        it('should not call setMessages', async(() => {

            spyOn(comp, 'setMessages').and.callThrough();

            expect(comp.setMessages).not.toHaveBeenCalled();
        }));
    });

    /**
     * TODO - test routing after sending reply
     */
});
