import { Observable } from 'rxjs/Observable';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot } from '@angular/router';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { DraftMessageEditResolver } from './draft-message-edit.resolver.service';

import { MockActivatedRoute } from '../../../testing/ActivatedRouteSnapshot_stub';
import { createDraftMessage_server } from '../../../testing/create_SecureMessage';

let mockDraftMessage: any,
    mockSecureMessageActions: any,

    apiData: any;

describe('DraftMessageEditResolver service', () => {

    beforeEach(() => {

        mockSecureMessageActions = {
            retrieveSecureMessage: function (id: string) {
                return Observable.of(mockDraftMessage);
            }
        };

        spyOn(mockSecureMessageActions, 'retrieveSecureMessage').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SecureMessagesModule
            ],
            providers: [
                { provide: SecureMessagesActions, useValue: mockSecureMessageActions }
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        apiData = undefined;
    });

    describe('resolve [method]', () => {

        it('should call the secure message service method retrieveSecureMessage to retrieve a draft message',
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

                    expect(mockSecureMessageActions.retrieveSecureMessage).toHaveBeenCalledWith('100');
                }));
    });
});
