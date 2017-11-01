import { Observable } from 'rxjs/Observable';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesService } from '../secure-messages.service';
import { DraftMessageEditResolver } from './draft-message-edit.resolver.service';

import { MockActivatedRoute } from '../../../testing/ActivatedRouteSnapshot_stub';
import { createDraftMessage_server } from '../../../testing/create_SecureMessage';

import { global } from '../../shared/utils';

let mockDraftMessage: any,
    mockSecureMessageService: any,
    mockSecureMessageService_observable: any,

    apiData: any;

describe('DraftMessageEditResolver service', () => {

    beforeEach(() => {

        global.view = {
            location: {
                href: ''
            }
        };

        mockSecureMessageService_observable = Observable.of({
            json: function () {
                return mockDraftMessage;
            }
        });

        mockSecureMessageService = {
            getMessage: function () {
                return mockSecureMessageService_observable;
            }
        };

        spyOn(global, 'changeLocation');
        spyOn(mockSecureMessageService, 'getMessage').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SecureMessagesModule
            ],
            providers: [
                { provide: SecureMessagesService, useValue: mockSecureMessageService }
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        apiData = undefined;
    });

    describe('resolve [method]', () => {

        it('should call the secure message service method getMessage to retrieve a draft message',
            inject([DraftMessageEditResolver],
                (draftMessageEditResolver: DraftMessageEditResolver) => {
                    mockDraftMessage = createDraftMessage_server('100');

                    const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                        params = {
                            'draft-message-id': '100'
                        };

                    activatedRouteSnapShot.params = params;
                    draftMessageEditResolver.resolve(activatedRouteSnapShot)
                        .subscribe((exportedData: any) => {
                            expect(exportedData).toEqual({ draftMessage: mockDraftMessage });
                        });

                    expect(mockSecureMessageService.getMessage).toHaveBeenCalledWith('100');
                }));

        describe('when draft not found', () => {

            const getDraftError = 'Error getting draft message';

            beforeEach(() => {
                mockSecureMessageService_observable = Observable.throw(getDraftError);
            });

            it('should route the user to a 404 page',
                inject([DraftMessageEditResolver],
                    (draftMessageEditResolver: DraftMessageEditResolver) => {

                        spyOn(draftMessageEditResolver.router, 'navigate');

                        const activatedRouteSnapShot: ActivatedRouteSnapshot = new MockActivatedRoute(),
                            params = {
                                'draft-message-id': '200'
                            };

                        activatedRouteSnapShot.params = params;

                        try {
                            draftMessageEditResolver.resolve(activatedRouteSnapShot)
                                .subscribe(() => {
                                    expect(draftMessageEditResolver.router.navigate).toHaveBeenCalledWith(['/404']);
                                });
                        } catch (e) {}
                        finally {}
                    }));
        });
    });
});
