import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AuthenticationActions } from '../authentication.actions';
import { SignInContainerComponent } from './sign-in.container';
import { AuthenticationModule } from '../authentication.module';

let fixture: ComponentFixture<any>,
    mockAuthenticationActions: any,
    mockServerResponse: any;

describe('SignInContainerComponent', () => {

    beforeEach(() => {

        /**
         * Default server response
         */
        mockServerResponse = Observable.of({});

        mockAuthenticationActions = {
            authenticateCredentials() {
                return mockServerResponse;
            }
        };

        spyOn(mockAuthenticationActions, 'authenticateCredentials').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                AuthenticationModule
            ],
            providers: [
                { provide: AuthenticationActions, useValue: mockAuthenticationActions }
            ]
        })
        .compileComponents();
    });

    describe('signInClick_handler [method]', () => {

        describe('when fields are valid', () => {

            it('should call AuthenticationActions authenticateCredentials method', async(() => {
                fixture = TestBed.createComponent(SignInContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    const comp = fixture.debugElement.componentInstance;

                    const un = 'testusername';
                    const pw = '123';

                    comp.email = un;
                    comp.password = pw;

                    comp.signInClick_handler();

                    expect(mockAuthenticationActions.authenticateCredentials).toHaveBeenCalledWith(un, pw);
                });
            }));

            describe('and user credentials are incorrect', () => {

                beforeEach(() => {
                    mockServerResponse = Observable.throw('Error');
                });

                it('should set the signInNotification property', () => {
                    fixture = TestBed.createComponent(SignInContainerComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();
                        const comp = fixture.debugElement.componentInstance;

                        const un = 'invalidtestusername';
                        const pw = 'invalidpassword';

                        comp.email = un;
                        comp.password = pw;

                        comp.signInClick_handler();

                        expect(mockAuthenticationActions.authenticateCredentials).toHaveBeenCalledWith(un, pw);
                        expect(comp.signInNotification).toEqual('Invalid username or password');
                    });
                });
            });
        });

        describe('when fields are invalid', () => {

            it('should not call AuthenticationActions authenticateCredentials method', async(() => {
                fixture = TestBed.createComponent(SignInContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    const comp = fixture.debugElement.componentInstance;

                    comp.signInClick_handler();

                    expect(mockAuthenticationActions.authenticateCredentials).not.toHaveBeenCalled();
                });
            }));
        });
    });

    describe('fieldsAreValid [method]', () => {

        it('should return true if all sign in fields are valid', async(() => {
            fixture = TestBed.createComponent(SignInContainerComponent);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                const comp = fixture.debugElement.componentInstance;

                const un = 'testusername';
                const pw = '123';

                comp.email = un;
                comp.password = pw;

                const result = comp.fieldsAreValid();

                expect(result).toEqual(true);
            });
        }));

        it('should return false if one field is invalid', async(() => {
            fixture = TestBed.createComponent(SignInContainerComponent);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                const comp = fixture.debugElement.componentInstance;

                const result = comp.fieldsAreValid();

                expect(result).toEqual(false);
            });
        }));
    });
});
