import { Observable } from 'rxjs/Rx';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import {
    Headers,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import { AuthenticationService } from '../authentication/authentication.service';
import { PartyService } from './party.service';
import { createRespondent_server } from '../../testing/create_Respondent';
import { createReportingUnit_server } from '../../testing/create_RerportingUnit';

let mockAuthenticationService: any,
    mockServerBusiness: any,
    mockServerRespondent: any;

function checkCatchServerError (observable: Observable<any>, mockBackend: MockBackend) {

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

describe('PartyService', () => {

    beforeEach(() => {

        mockAuthenticationService = {
            authenticate(observableMethod: any) {
                return true;
            }
        };

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                PartyService,
                // { provide: Router, useValue: mockRouter },
                { provide: XHRBackend, useClass: MockBackend },
                { provide: AuthenticationService, useValue: mockAuthenticationService }
            ]
        });
    });

    afterEach(() => {
        mockAuthenticationService = undefined;
    });

    it('should inject the service', inject([PartyService], (service: PartyService) => {
        expect(service).toBeTruthy();
    }));

    describe('getBusiness [method]', () => {

        describe('when the business exists in the service', () => {

            it('should successfully retrieve a business',
                inject([PartyService, XHRBackend],
                    (partyService: PartyService, mockBackend: MockBackend) => {
                        let mockServiceCall: any;

                        mockServerBusiness = createReportingUnit_server();

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        body: JSON.stringify(mockServerBusiness)
                                    })));
                        });

                        mockServiceCall = partyService.getBusiness('123');

                        mockServiceCall.subscribe((serverResponse: any) => {
                            const resJSON = serverResponse.json();
                            expect(resJSON).toEqual(mockServerBusiness);
                        });
                    }));
        });

        describe('when the business does not exist in the service', () => {

            it('should catch server error response',
                inject([PartyService, XHRBackend],
                    (partyService: PartyService, mockBackend: MockBackend) => {
                        checkCatchServerError(
                            partyService.getBusiness('234').share(),
                            mockBackend);
                    }));
        });
    });

    describe('getRespondent [method]', () => {

        describe('when the respondent exists in the service', () => {

            it('should successfully retrieve a business',
                inject([PartyService, XHRBackend],
                    (partyService: PartyService, mockBackend: MockBackend) => {
                        let mockServiceCall: any;

                        mockServerRespondent = createRespondent_server();

                        mockBackend.connections.subscribe((connection: any) => {
                            connection.mockRespond(
                                new Response(
                                    new ResponseOptions({
                                        body: JSON.stringify(mockServerRespondent)
                                    })));
                        });

                        mockServiceCall = partyService.getBusiness('345');

                        mockServiceCall.subscribe((serverResponse: any) => {
                            const resJSON = serverResponse.json();
                            expect(resJSON).toEqual(mockServerRespondent);
                        });
                    }));
        });

        describe('when the respondent does not exist in the service', () => {

            it('should catch server error response',
                inject([PartyService, XHRBackend],
                    (partyService: PartyService, mockBackend: MockBackend) => {
                        checkCatchServerError(
                            partyService.getRespondent('456').share(),
                            mockBackend);
                    }));
        });
    });
});
