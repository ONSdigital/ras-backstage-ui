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
    // mockRouter: any,
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

describe('SecureMessageCreateContainerComponent', () => {

    beforeEach(() => {

        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(null);
            },
        };

        mockUserActions = {
            getUser: function() {
                return Observable.of({
                    id: '123'
                });
            }
        };

        mockSecureMessagesActions = {
            createSecureMessage: function() {
                return Observable.of({/*Server status object*/});
            },
            saveDraft: function() {
                return Observable.of({/*Server status object*/});
            }
        };

        spyOn(mockUserActions, 'getUser').and.callThrough();
        spyOn(mockSecureMessagesActions, 'createSecureMessage').and.callFake(function () {
            return {
                subscribe: function () {}
            };
        });
        spyOn(mockSecureMessagesActions, 'saveDraft').and.callFake(function () {
            return {
                subscribe: function () {}
            };
        });

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

        describe('and reporting unit & respondent exist on exported route data', () => {

            it('should setup the secureMessage correctly', async(() => {
                const reportingUnit: any = {
                        id: 'reportingUnit:123456'
                    },
                    respondent: any = {
                        id: 'respondent: 098765'
                    };

                mockRouteSnapshot.data = {
                    exported: {
                        reportingUnit,
                        respondent
                    }
                };

                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    expect(comp.secureMessage).toEqual({
                        msg_to: [respondent.id],
                        msg_from: '123',
                        subject: '',
                        body: '',
                        ru_id: reportingUnit.id,
                        survey: 'BRES',
                        '@msg_to': [{}],
                        '@ru_id': {}
                    });
                });
            }));
        });

        describe('and reporting unit does not exist on exported route data', () => {

            it('should not setup the secureMessage', async(() => {

                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    expect(comp.secureMessage).toEqual(createDefaultSecureMessage());
                });
            }));
        });

        describe('and respondent does not exist on exported route data', () => {

            it('should not setup the secureMessage', async(() => {

                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    expect(comp.secureMessage).toEqual(createDefaultSecureMessage());
                });
            }));
        });
    });

    describe('when the sendSecureMessage_handler is invoked', () => {

        describe('and message properties are valid', () => {

            it('should call createSecureMessage action method from the SecureMessageActions service.', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    comp.secureMessage.subject = 'Test subject';
                    comp.secureMessage.body = 'Test body';

                    comp.sendSecureMessage_handler();

                    expect(mockSecureMessagesActions.createSecureMessage).toHaveBeenCalled();
                });
            }));
        });

        describe('and message properties are invalid', () => {

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

    describe('when the saveDraft_handler is invoked', () => {

        describe('and message properties are valid', () => {

            it('should call saveDraft action method from the SecureMessageActions service.', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    comp.secureMessage.subject = 'Test subject';
                    comp.secureMessage.body = 'Test body';

                    comp.saveDraft_handler();

                    expect(mockSecureMessagesActions.saveDraft).toHaveBeenCalled();
                });
            }));
        });

        describe('and message properties are invalid', () => {

            it('should not call saveDraft action method from the SecureMessageActions service.', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    comp.saveDraft_handler();

                    expect(mockSecureMessagesActions.saveDraft).not.toHaveBeenCalled();
                });
            }));
        });
    });
});
