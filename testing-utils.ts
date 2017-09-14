import {
    Response,
    ResponseOptions
} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MockBackend } from '@angular/http/testing';
import { inject } from '@angular/core/testing';

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
