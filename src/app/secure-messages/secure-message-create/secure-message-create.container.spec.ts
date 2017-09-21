import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { UserActions } from '../../user/user.actions';

import { SecureMessagesModule } from '../secure-messages.module';
// import { AppRoutingModule, appRoutes } from '../../app-routing.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessageCreateContainerComponent } from './secure-message-create.container';

let fixture: ComponentFixture<any>,
    instance: any,

    mockStore: any,
    mockUserActions: any,

    mockSecureMessagesActions: any;

const mockRouteSnapshot: any = {
    data: {}
};

function createDefaultSecureMessage() {
    const msgTo: Array<any> = [];

    return {
        msg_to: msgTo,
        msg_from: '',
        subject: '',
        body: '',
        ru_id: '',
        survey: 'BRES',
        '@msg_to': [{}],
        '@ru_id': {}
    };
}

let mockGetUser_observable: Observable<any>,
    mockCreateSecureMessage_observable: Observable<any>,
    mockDraftMessage_observable: Observable<any>;

const originalConsoleLog = console.log;

function resetGetUserObservable () {
    mockGetUser_observable = Observable.of({
        id: '123'
    });
}

describe('SecureMessageCreateContainerComponent', () => {

    beforeEach(() => {

        resetGetUserObservable();
        mockCreateSecureMessage_observable = Observable.of({});
        mockDraftMessage_observable = Observable.of({});

        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(null);
            },
        };

        mockUserActions = {
            getUser: function() {
                return mockGetUser_observable;
            }
        };

        mockSecureMessagesActions = {
            createSecureMessage: function() {
                return mockCreateSecureMessage_observable;
            },
            saveDraft: function() {
                return mockDraftMessage_observable;
            }
        };

        spyOn(console, 'log').and.callThrough();
        spyOn(mockUserActions, 'getUser').and.callThrough();
        spyOn(mockSecureMessagesActions, 'createSecureMessage').and.callThrough();
        spyOn(mockSecureMessagesActions, 'saveDraft').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                // RouterTestingModule.withRoutes(appRoutes),
                // AppRoutingModule,
                SecureMessagesModule
            ],
            /*declarations: [
                AppComponent
            ],*/
            providers: [
                { provide: NgRedux, useValue: mockStore},
                { provide: UserActions, useValue: mockUserActions },
                { provide: SecureMessagesActions, useValue: mockSecureMessagesActions },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: mockRouteSnapshot
                    }
                }
            ]
        })
        .compileComponents();

        // router = TestBed.get(Router);
        // router.initialNavigation();
    });

    afterEach(() => {
        mockRouteSnapshot.data = {};
        console.log = originalConsoleLog;
    });

    /**
     * TODO - Test routing after sending a message
     */

    it('should initialise correctly', async(() => {
        fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
        instance = fixture.componentInstance;

        const comp = fixture.debugElement.componentInstance;
        spyOn(comp, 'createMessageUpdate').and.callThrough();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp).toBeTruthy();
            expect(comp.secureMessage).toEqual(createDefaultSecureMessage());
            expect(comp.createMessageUpdate).toHaveBeenCalled();
            expect(mockUserActions.getUser).toHaveBeenCalled();
        });
    }));

    describe('when initialising a new secure message', () => {

        describe('and current user is not found', () => {

            beforeEach(() => {
                mockGetUser_observable = Observable.throw('Error fetching user');
            });

            afterEach(() => {
                resetGetUserObservable();
            });

            it('should not call createMessageUpdate', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    spyOn(comp, 'createMessageUpdate');

                    expect(comp.secureMessage).toEqual(createDefaultSecureMessage());
                    expect(comp.createMessageUpdate).not.toHaveBeenCalled();
                });
            }));

            describe('and createMessageUpdate is invoked', () => {

                it('should not intialise a new secure message', async(() => {
                    fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                    instance = fixture.componentInstance;

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        comp.createMessageUpdate(null);

                        expect(console.log).toHaveBeenCalledWith('Logged in user not found');
                        expect(comp.secureMessage).toEqual(createDefaultSecureMessage());
                    });
                }));
            });
        });

        describe('and reporting unit & respondent exist on exported route data', () => {

            let reportingUnit: any,
                respondent: any;

            const userId = '123';

            beforeEach(() => {
                reportingUnit = {
                    id: 'reportingUnit:123456'
                };
                respondent = {
                    id: 'respondent: 098765'
                };

                mockRouteSnapshot.data = {
                    exported: {
                        reportingUnit,
                        respondent
                    }
                };
            });

            it('should setup the secureMessage correctly', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    expect(comp.secureMessage).toEqual({
                        msg_to: [respondent.id],
                        msg_from: userId,
                        subject: '',
                        body: '',
                        ru_id: reportingUnit.id,
                        survey: 'BRES',
                        '@msg_to': [{}],
                        '@ru_id': {}
                    });
                });
            }));

            describe('and respondentCaseId (aka collection_case property--to the sm service) is found',
                () => {

                    const respondentCaseId = '5000';

                    beforeEach(() => {
                        mockRouteSnapshot.data.exported.respondentCaseId = respondentCaseId;
                    });

                    afterEach(() => {
                        delete mockRouteSnapshot.data.exported.respondentCaseId;
                    });

                    it('should add the collection_case property to the new message ', async(() => {
                        fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                        instance = fixture.componentInstance;

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            const comp = fixture.debugElement.componentInstance;

                            expect(comp.secureMessage).toEqual({
                                msg_to: [respondent.id],
                                msg_from: userId,
                                subject: '',
                                body: '',
                                ru_id: reportingUnit.id,
                                survey: 'BRES',
                                '@msg_to': [{}],
                                '@ru_id': {},
                                collection_case: respondentCaseId
                            });
                        });
                    }));
                });

            describe('and secure message does not have aggregate data', () => {

                it('should return undefined', async(() => {
                    fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                    instance = fixture.componentInstance;

                    const comp = fixture.debugElement.componentInstance;

                    spyOn(comp, 'secureMessageHasAgreggateData').and.callThrough();

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        expect(comp.secureMessageHasAgreggateData).toHaveBeenCalled();

                        const result = comp.createMessageUpdate({ id: '300' });
                        expect(result ).toEqual(undefined);
                    });
                }));
            });
        });

        describe('and reporting unit does not exist on exported route data', () => {

            beforeEach(() => {
                mockRouteSnapshot.data = {
                    exported: {}
                };
            });

            it('should not setup the secureMessage', async(() => {

                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    expect(comp.secureMessage).toEqual(createDefaultSecureMessage());
                    expect(console.log).toHaveBeenCalledWith('reportingUnit or respondent not found in ' +
                        'exported data: ', {});

                    /**
                     * Also run in isolation
                     */
                    expect(comp.createMessageUpdate({ id: '123' })).toEqual(undefined);
                });
            }));
        });

        describe('and respondent does not exist on exported route data', () => {

            beforeEach(() => {
                mockRouteSnapshot.data = {
                    exported: {}
                };
            });

            it('should not setup the secureMessage', async(() => {

                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    expect(comp.secureMessage).toEqual(createDefaultSecureMessage());
                    expect(console.log).toHaveBeenCalledWith('reportingUnit or respondent not found in ' +
                        'exported data: ', {});

                    /**
                     * Also run in isolation
                     */
                    expect(comp.createMessageUpdate({ id: '123' })).toEqual(undefined);
                });
            }));
        });
    });

    describe('sendSecureMessage_handler [method]', () => {

        let reportingUnit: any,
            respondent: any;

        beforeEach(() => {
            reportingUnit = {
                id: 'reportingUnit:123456'
            };
            respondent = {
                id: 'respondent: 098765'
            };

            mockRouteSnapshot.data = {
                exported: {
                    reportingUnit,
                    respondent
                }
            };
        });

        describe('when message properties are valid', () => {

            it('should call createSecureMessage action method from the SecureMessageActions service.', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    comp.secureMessage.subject = 'Test subject';
                    comp.secureMessage.body = 'Test body';

                    /**
                     * Stop DI error when router tries to navigate
                     */
                    comp.router.navigate = function () {};

                    comp.sendSecureMessage_handler();

                    expect(mockSecureMessagesActions.createSecureMessage).toHaveBeenCalled();
                });
            }));

            describe('and the secure message was successfully created', () => {

                it('should navigate to the secure messages list page', async(() => {
                    fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                    instance = fixture.componentInstance;

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        comp.secureMessage.subject = 'Test subject';
                        comp.secureMessage.body = 'Test body';

                        spyOn(comp.router, 'navigate');

                        comp.sendSecureMessage_handler();

                        expect(comp.router.navigate).toHaveBeenCalledWith(['/secure-messages']);
                    });
                }));
            });

            describe('and secure message was not created by the service', () => {

                const errorMessage = 'Error creating message';

                beforeEach(() => {
                    mockCreateSecureMessage_observable = Observable.throw(errorMessage);
                });

                it('should not navigate to the secure messages list page', async(() => {
                    fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                    instance = fixture.componentInstance;

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        comp.secureMessage.subject = 'Test subject';
                        comp.secureMessage.body = 'Test body';

                        comp.sendSecureMessage_handler();

                        expect(console.log).toHaveBeenCalledWith('Error: ', errorMessage);
                    });
                }));
            });
        });

        describe('when message properties are invalid', () => {

            it('should not call createSecureMessage action method from the SecureMessageActions service.', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    comp.sendSecureMessage_handler();

                    expect(mockSecureMessagesActions.createSecureMessage).not.toHaveBeenCalled();
                });
            }));
        });
    });

    describe('saveDraft_handler [method]', () => {

        let reportingUnit: any,
            respondent: any;

        beforeEach(() => {
            reportingUnit = {
                id: 'reportingUnit:123456'
            };
            respondent = {
                id: 'respondent: 098765'
            };

            mockRouteSnapshot.data = {
                exported: {
                    reportingUnit,
                    respondent
                }
            };
        });

        /**
         * Always call the service
         */
        it('should call saveDraft action method from the SecureMessageActions service.', async(() => {
            fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
            instance = fixture.componentInstance;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const comp = fixture.debugElement.componentInstance;
                comp.secureMessage.subject = '';
                comp.secureMessage.body = 'Test body';

                /**
                 * Stop DI error when router tries to navigate
                 */
                comp.router.navigate = function () {};

                comp.saveDraft_handler({
                    preventDefault: function () {}
                });

                expect(mockSecureMessagesActions.saveDraft).toHaveBeenCalled();
            });
        }));

        describe('when the draft was successfully updated', () => {

            it('should navigate to the secure messages list page', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    const evt = {
                        preventDefault() {}
                    };

                    spyOn(evt, 'preventDefault');
                    spyOn(comp.router, 'navigate');

                    comp.saveDraft_handler(evt);

                    expect(evt.preventDefault).toHaveBeenCalled();
                    expect(comp.router.navigate).toHaveBeenCalledWith(['/secure-messages']);
                });
            }));
        });

        describe('and secure message was not created by the service', () => {

            const errorMessage = 'Error updating draft';

            beforeEach(() => {
                mockDraftMessage_observable = Observable.throw(errorMessage);
            });

            it('should not navigate to the secure messages list page', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    const evt = {
                        preventDefault() {}
                    };

                    spyOn(evt, 'preventDefault');

                    comp.saveDraft_handler(evt);

                    expect(evt.preventDefault).toHaveBeenCalled();
                    expect(console.log).toHaveBeenCalledWith('Error: ', errorMessage);
                });
            }));
        });
    });
});
