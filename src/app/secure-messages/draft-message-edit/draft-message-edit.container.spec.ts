import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../../app.component';
import { secureMessagesRoutes } from '../secure-messages-routing.module';
import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { DraftMessageEditContainerComponent } from './draft-message-edit.container';

import { createDraftMessage_server } from '../../../testing/create_SecureMessage';

let fixture: ComponentFixture<any>,

    mockRouter: any,
    mockExportedData: any,
    mockSecureMessagesActions: any;

describe('DraftMessageEditContainerComponent', () => {

    beforeEach(() => {
        mockSecureMessagesActions = {
            createSecureMessage: function() {
                return {
                    subscribe: function (){}
                };
            },
            updateDraft: function() {
                return {
                    subscribe: function (){}
                };
            }
        };

        spyOn(mockSecureMessagesActions, 'createSecureMessage').and.callThrough();
        spyOn(mockSecureMessagesActions, 'updateDraft').and.callThrough();
    });

    afterEach(() => {
        mockExportedData = undefined;
    });

    describe('when draft message is not exported on to route data', () => {

        beforeEach(() => {

            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule,
                    SecureMessagesModule
                ],
                providers: [
                    { provide: SecureMessagesActions, useValue: mockSecureMessagesActions },
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            snapshot: {
                                data: {
                                    exported: undefined
                                }
                            }
                        }
                    }
                ]
            })
            .compileComponents();
        });

        it('should initialise', async(() => {
            fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

            mockExportedData = undefined;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const comp = fixture.debugElement.componentInstance;
                expect(comp).toBeTruthy();
                expect(comp.draftMessage).toEqual(undefined);
            });
        }));
    });

    describe('when draft message is exported on to route data', () => {

        beforeEach(() => {
            mockExportedData = {
                draftMessage: createDraftMessage_server('100')
            };

            mockRouter = {
                navigate: function () {}
            };

            spyOn(mockRouter, 'navigate').and.callThrough();

            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes(secureMessagesRoutes),
                    SecureMessagesModule
                ],
                declarations: [
                    AppComponent
                ],
                providers: [
                    { provide: SecureMessagesActions, useValue: mockSecureMessagesActions },
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            snapshot: {
                                data: {
                                    exported: mockExportedData
                                }
                            }
                        }
                    }
                ]
            })
            .compileComponents();
        });

        it('should set up the data correctly', async(() => {
            fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const comp = fixture.debugElement.componentInstance;
                expect(comp.draftMessage.subject).toEqual('Draft message subject');
                expect(comp.draftMessage.body).toEqual('Draft message body');
            });
        }));

        describe('and sendMessage_handler is invoked', () => {

            describe('and message is valid', () => {

                it('should call createSecureMessage on the SecureMessagesActions service', async(() => {
                    fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;
                        comp.sendMessage_handler();

                        expect(mockSecureMessagesActions.createSecureMessage).toHaveBeenCalled();
                    });
                }));
            });

            describe('and message is invalid', () => {

                it('should not call the SecureMessagesActions service', async(() => {
                    fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        comp.draftMessage.subject = '';
                        comp.draftMessage.body = '';

                        comp.sendMessage_handler();

                        expect(mockSecureMessagesActions.createSecureMessage).not.toHaveBeenCalled();
                    });
                }));
            });
        });

        describe('and saveDraft_handler is invoked', () => {

            /**
             * Always call the service
             */
            it('should call updateDraft on the SecureMessagesActions service', async(() => {
                fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    comp.saveDraft_handler({
                        preventDefault: function () {}
                    });

                    expect(mockSecureMessagesActions.updateDraft).toHaveBeenCalled();
                });
            }));
        });
    });
});
