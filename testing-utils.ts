import {
    Response,
    ResponseOptions
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MockBackend } from '@angular/http/testing';
import { inject } from '@angular/core/testing';
import construct = Reflect.construct;

import { global } from './src/app/shared/utils';

const originalValidationOutput = global.validationOutput;
export function createBadRequest (opts: any) {
    const res: Response = new Response(
        new ResponseOptions({
            body: {}
        }));

    res.ok = false;
    res.status = 500;
    res.statusText = '';
    res.type = 3;
    res.url = null;

    Object.assign(res, opts);

    return Observable.throw({
        errorMessage: 'Errored request',
        response: res
    });
}

export function checkCatchServerError (observable: Observable<any>, mockBackend: MockBackend) {

    mockBackend.connections.subscribe((connection: any) => {
        const res = new Response(
            new ResponseOptions({
                body: {}
            }));

        res.ok = false;
        res.status = 500;
        res.statusText = '';
        res.type = 3;
        res.url = null;

        connection.mockError(res);
    });

    observable.subscribe(
        () => {},
        (err: any) => {
            expect(err.ok).toEqual(false);
            expect(err.status).toEqual(500);
            expect(err.statusText).toEqual('');
            expect(err.type).toEqual(3);
            expect(err.url).toEqual(null);
        }
    );
}

export function assertStateMaintainedWithinvalidAction (action: any, reducer: any, state: any) {

    it('should return the existing state of the data store', () => {
        expect(reducer(state, action)).toEqual(state);
    });
}

export function testMessageHasAggregatedData (describeFunctionName: string, FUNC: Function, validData: Object) {

    describe(describeFunctionName, () => {

        let message: any;

        afterEach(() => {
            message = undefined;
        });

        describe('when message has aggregated data', () => {

            beforeEach(() => {

                message = validData;
            });

            it('should return true', () => {
                expect(FUNC(message)).toEqual(true);
            });
        });

        describe('when message does not have aggregated data', () => {

            beforeEach(() => {

                message = {
                    '@msg_to': [
                        {}
                    ]
                };
            });

            it('should return false', () => {
                expect(FUNC(message)).toEqual(false);
            });

            describe('and has empty @msg_to array', () => {

                beforeEach(() => {

                    message = {
                        '@msg_to': []
                    };

                    spyOn(global, 'validationOutput').and.callThrough();
                });

                afterEach(() => {
                    global.validationOutput = originalValidationOutput;
                });

                it('should call global validationOutput [method]', () => {

                    expect(FUNC(message)).toEqual(false);
                    expect(global.validationOutput).toHaveBeenCalledWith({
                        notification: 'Property @msg_to array empty',
                        subject: message
                    });
                });
            });
        });
    });
}

/*
export const describeService = {

    /!*success({
        service
    }) {
        it('should successfully POST a secure message',
            inject([SecureMessagesService, XHRBackend],
                (secureMessagesService: SecureMessagesService, mockBackend: MockBackend) => {
                    mockClientSecureMessage = createSecureMessage_client();
                    mockServerSecureMessage = createSecureMessage_server('100');

                    mockBackend.connections.subscribe((connection: any) => {
                        connection.mockRespond(
                            new Response(
                                new ResponseOptions({
                                    body: JSON.stringify(mockServerSecureMessage)
                                })));
                    });

                    mockServiceCall = secureMessagesService.createSecureMessage(mockClientSecureMessage);

                    mockServiceCall.subscribe((serverResponse: any) => {
                        console.log('serverResponse: ', serverResponse);
                        expect(serverResponse.json()).toEqual(mockServerSecureMessage);
                    });
                }));
    },*!/

    fail() {

    }
};
*/
