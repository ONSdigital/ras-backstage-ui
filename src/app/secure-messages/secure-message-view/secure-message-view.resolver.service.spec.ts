import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MockActivatedRoute } from '../../../testing/ActivatedRouteSnapshot_stub';
import { createSecureMessage_server } from '../../../testing/create_SecureMessage';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessageViewResolver } from './secure-message-view.resolver.service';

let mockReduxStore: any,
    mockSecureMessage: any,
    mockSecureMessageActions: any,

    storeData: any,
    apiData: any;

describe('SecureMessageViewResolver service', () => {

    beforeEach(() => {

        mockReduxStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(storeData);
            },
        };

        mockSecureMessageActions = {
            retrieveSecureMessage: function (id: string) {
                return Observable.of(mockSecureMessage);
            }
        };

        spyOn(mockSecureMessageActions, 'retrieveSecureMessage').and.callThrough();
        spyOn(mockReduxStore, 'select').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                SecureMessagesModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockReduxStore },
                { provide: SecureMessagesActions, useValue: mockSecureMessageActions }
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        storeData = undefined;
        apiData = undefined;
    });

    /**
     * TODO - Check routing for invalid message id
     */

    describe('resolve [method]', () => {

        it('should check the secure message exists in the data store first',
            inject([SecureMessageViewResolver],
                (secureMessageViewResolver: SecureMessageViewResolver) => {
                    mockSecureMessage = createSecureMessage_server('100');

                    const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                        params = {
                            'secure-message-id': '100'
                        };

                    activatedRouteSnapShot.params = params;
                    storeData = [createSecureMessage_server('100')];

                    secureMessageViewResolver.resolve(activatedRouteSnapShot).subscribe();

                    expect(mockReduxStore.select).toHaveBeenCalledWith(['secureMessages', 'items']);
                }));

        describe('when a secure message exists in the data store', () => {

            it('should not call the secure message service',
                inject([SecureMessageViewResolver],
                    (secureMessageViewResolver: SecureMessageViewResolver) => {
                        mockSecureMessage = createSecureMessage_server('200');

                        const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                            params = {
                                'secure-message-id': '200'
                            };

                        activatedRouteSnapShot.params = params;
                        storeData = [createSecureMessage_server('200')];

                        secureMessageViewResolver.resolve(activatedRouteSnapShot).subscribe();

                        expect(mockSecureMessageActions.retrieveSecureMessage)
                            .not.toHaveBeenCalled();
                        expect(mockSecureMessageActions.retrieveSecureMessage)
                            .not.toHaveBeenCalledWith(params['secure-message-id']);
                    }));
        });

        describe('when a secure message does not exist in the data store', () => {

            it('should call the secure message service to retrieve data',
                inject([SecureMessageViewResolver],
                    (secureMessageViewResolver: SecureMessageViewResolver) => {
                        mockSecureMessage = createSecureMessage_server('300');

                        const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                            params = {
                                'secure-message-id': '300'
                            };

                        activatedRouteSnapShot.params = params;
                        storeData = [];
                        apiData = createSecureMessage_server('300');

                        secureMessageViewResolver.resolve(activatedRouteSnapShot).subscribe();

                        expect(mockSecureMessageActions.retrieveSecureMessage)
                            .toHaveBeenCalled();
                        expect(mockSecureMessageActions.retrieveSecureMessage)
                            .toHaveBeenCalledWith(params['secure-message-id']);
                    }));
        });
    });
});
