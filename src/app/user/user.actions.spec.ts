import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, async, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { UserActions } from './user.actions';

let mockReduxStore: any,
    mockObservable_response: any,
    mockUserService: any,
    successResponse: any = {},
    failResponse = 'Erroring';

const originalLog = console.log;

describe('UserActions', () => {

    beforeEach(() => {

        mockReduxStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {}
        };

        mockUserService = {
            getUser() {
                return mockObservable_response;
            }
        };

        spyOn(console, 'log');
        spyOn(mockReduxStore, 'dispatch');
        spyOn(mockUserService, 'getUser').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule
            ],
            providers: [
                UserActions,
                { provide: NgRedux, useValue: mockReduxStore },
                { provide: UserService, useValue: mockUserService }
            ]
        });
    });

    afterEach(() => {
        mockUserService = undefined;
        mockObservable_response = undefined;
        mockReduxStore = undefined;
        successResponse = {};
        failResponse = 'Erroring';

        console.log = originalLog;
    });

    describe('getUser [method]', () => {

        it('should dispatch ' + UserActions.GET_USER  + ' redux action',
            inject([UserActions],
                (userActions: UserActions) => {
                    mockObservable_response = Observable.of({});

                    userActions.getUser().subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: UserActions.GET_USER
                    });
                }));

        it('should call UserService getUser method to get a survey',
            inject([UserActions],
                (userActions: UserActions) => {
                    mockObservable_response = Observable.of({});

                    userActions.getUser().subscribe();

                    expect(mockUserService.getUser).toHaveBeenCalled();
                }));

        describe('after successfully retrieving user details', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call userReceived',
                inject([UserActions],
                    (userActions: UserActions) => {
                        spyOn(userActions, 'userReceived');

                        userActions.getUser().subscribe();

                        expect(userActions.userReceived).toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to retrieve user details', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([UserActions],
                    (userActions: UserActions) => {
                        spyOn(userActions, 'userReceived');

                        userActions.getUser().subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch userReceived action, service error: ', failResponse);
                            }
                        );

                        expect(userActions.userReceived).not.toHaveBeenCalled();
                    }));
        });
    });

    describe('userReceived [method]', () => {

        it('should dispatch ' + UserActions.RECEIVED_USER  + ' redux action',
            inject([UserActions],
                (userActions: UserActions) => {

                    /**
                     * Not sure what a user type will be yet (current closest is respondent).
                     */
                    const mockUser: any = {
                        firstName: '',
                        lastName: '',
                        otherProps: ''
                    };

                    userActions.userReceived(mockUser);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: UserActions.RECEIVED_USER,
                        user: mockUser
                    });
                }));
    });
});
