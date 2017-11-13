import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from '../../app.component';
import { secureMessagesRoutes } from '../secure-messages-routing.module';
import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { DraftMessageEditContainerComponent, draftMessageHasAgreggateData } from './draft-message-edit.container';

import { createDraftMessage_server } from '../../../testing/create_SecureMessage';

import { testMessageHasAggregatedData } from '../../../../testing-utils';

import { global } from '../../shared/utils';

let fixture: ComponentFixture<any>,

    mockExportedData: any,
    mockSecureMessagesActions: any,
    mockCreateSecureMessage_observable: any,
    mockUpdateDraft_observable: any;

const originalConsoleLog: any = console.log;
const originalValidationOutput = global.validationOutput;

describe('DraftMessageEditContainerComponent', () => {

    beforeEach(() => {

        global.view = {
            location: {
                href: ''
            }
        };

        spyOn(console, 'log').and.callThrough();
        mockCreateSecureMessage_observable = Observable.of({});
        mockUpdateDraft_observable = Observable.of({});

        mockSecureMessagesActions = {
            createSecureMessage () {
                return mockCreateSecureMessage_observable;
            },
            updateDraft () {
                return mockUpdateDraft_observable;
            }
        };

        spyOn(mockSecureMessagesActions, 'createSecureMessage').and.callThrough();
        spyOn(mockSecureMessagesActions, 'updateDraft').and.callThrough();
    });

    afterEach(() => {
        mockExportedData = undefined;
        console.log = originalConsoleLog;
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
                    mockCreateSecureMessage_observable = Observable.of();

                    fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;
                        comp.sendMessage_handler();

                        expect(mockSecureMessagesActions.createSecureMessage).toHaveBeenCalled();
                    });
                }));

                describe('after successfully sending a draft', () => {

                    it('should call createSecureMessage on the SecureMessagesActions service', async(() => {
                        mockCreateSecureMessage_observable = Observable.of();

                        fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            const comp = fixture.debugElement.componentInstance;
                            comp.sendMessage_handler();

                            expect(mockSecureMessagesActions.createSecureMessage).toHaveBeenCalled();
                        });
                    }));

                    it('should navigate to secure message list view', async(() => {
                        mockCreateSecureMessage_observable = Observable.of({});

                        fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            const comp = fixture.debugElement.componentInstance;

                            comp.router = {
                                navigate: function () {}
                            };

                            spyOn(comp.router, 'navigate');

                            comp.sendMessage_handler();

                            expect(comp.router.navigate).toHaveBeenCalledWith(['/secure-messages']);
                            expect(mockSecureMessagesActions.createSecureMessage).toHaveBeenCalled();
                        });
                    }));
                });

                describe('after failing to send a draft', () => {

                    it('should log error to console', async(() => {
                        mockCreateSecureMessage_observable = Observable.throw('Error sending draft message').share();

                        fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            const comp = fixture.debugElement.componentInstance;

                            comp.router = {
                                navigate: function () {}
                            };

                            spyOn(comp.router, 'navigate');

                            comp.sendMessage_handler();

                            expect(comp.router.navigate).not.toHaveBeenCalled();
                            expect(mockSecureMessagesActions.createSecureMessage).toHaveBeenCalled();
                            expect(console.log).toHaveBeenCalled();
                        });
                    }));
                });
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

            let syntheticMouseEvt: MouseEvent;

            beforeEach(() => {
                syntheticMouseEvt = new MouseEvent('click', {bubbles: true});
            });

            /**
             * Always call the service
             */
            it('should call updateDraft on the SecureMessagesActions service', async(() => {
                mockUpdateDraft_observable = Observable.of();

                fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    comp.saveDraft_handler(syntheticMouseEvt);

                    expect(mockSecureMessagesActions.updateDraft).toHaveBeenCalled();
                });
            }));

            describe('after successfully saving a draft', () => {

                it('should navigate to secure message list view', async(() => {
                    mockUpdateDraft_observable = Observable.of({});

                    fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        comp.router = {
                            navigate: function () {}
                        };

                        spyOn(comp.router, 'navigate');

                        comp.saveDraft_handler(syntheticMouseEvt);

                        expect(comp.router.navigate).toHaveBeenCalledWith(['/secure-messages']);
                        expect(mockSecureMessagesActions.updateDraft).toHaveBeenCalled();
                    });
                }));
            });

            describe('after failing to save a draft', () => {

                it('should log error to console', async(() => {
                    mockUpdateDraft_observable = Observable.throw('Error saving draft message');

                    fixture = TestBed.createComponent(DraftMessageEditContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        comp.router = {
                            navigate: function () {}
                        };

                        spyOn(comp.router, 'navigate');

                        comp.saveDraft_handler(syntheticMouseEvt);

                        expect(comp.router.navigate).not.toHaveBeenCalledWith();
                        expect(mockSecureMessagesActions.updateDraft).toHaveBeenCalled();
                        expect(console.log).toHaveBeenCalledWith('Error: ', 'Error saving draft message');
                    });
                }));
            });
        });
    });
});

testMessageHasAggregatedData(
    'draftMessageHasAgreggateData [function]',
    draftMessageHasAgreggateData,
    {
        '@msg_to': [
            {}
        ],
        '@ru_id': ''
    });
