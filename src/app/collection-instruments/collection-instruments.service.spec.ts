import { TestBed, async, inject } from '@angular/core/testing';
import {
    Headers,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthenticationService } from '../authentication/authentication.service';
import { CollectionInstrumentsService } from './collection-instruments.service';

import { checkCatchServerError } from '../../../testing-utils';

let mockAuthenticationService: any,
    mockServiceCall: any;

describe('CollectionInstrumentsService', () => {

    beforeEach(() => {

        mockAuthenticationService = {
            encryptedHeaders: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                CollectionInstrumentsService,
                { provide: XHRBackend, useClass: MockBackend },
                { provide: AuthenticationService, useValue: mockAuthenticationService }
            ]
        });
    });

    afterEach(() => {
        mockAuthenticationService = undefined;
        mockServiceCall = undefined;
    });

    describe('getStatus [method]', () => {

        it('should successfully GET a collection instrument',
            inject([CollectionInstrumentsService, XHRBackend],
                (collectionInstrumentsService: CollectionInstrumentsService, mockBackend: MockBackend) => {
                    const mockCollectionIntrumentStatus: any = {
                        'count': 1,
                        'current': 1,
                        'id': '14fb3e68-4dca-46db-bf49-04b84e07e77c',
                        'status': 'pending'
                    };

                    mockBackend.connections.subscribe((connection: any) => {
                        connection.mockRespond(
                            new Response(
                                new ResponseOptions({
                                    body: JSON.stringify(mockCollectionIntrumentStatus)
                                })));
                    });

                    mockServiceCall = collectionInstrumentsService.getStatus('100');

                    mockServiceCall.subscribe((serverResponse: any) => {
                        expect(serverResponse.json()).toEqual(mockCollectionIntrumentStatus);
                    });
                }));

        it('should catch server error response',
            inject([CollectionInstrumentsService, XHRBackend],
                (collectionInstrumentsService: CollectionInstrumentsService, mockBackend: MockBackend) => {
                    checkCatchServerError(
                        collectionInstrumentsService.getStatus('200'),
                        mockBackend);
                }));
    });

    describe('loadCollectionInstrumentBatch [method]', () => {

        it('should successfully load a collection instrument batch',
            inject([CollectionInstrumentsService, XHRBackend],
                (collectionInstrumentsService: CollectionInstrumentsService, mockBackend: MockBackend) => {
                    const mockResponse: any = {};

                    mockBackend.connections.subscribe((connection: any) => {
                        connection.mockRespond(
                            new Response(
                                new ResponseOptions({
                                    body: JSON.stringify(mockResponse)
                                })));
                    });

                    mockServiceCall = collectionInstrumentsService.loadCollectionInstrumentBatch('300');

                    mockServiceCall.subscribe((serverResponse: any) => {
                        expect(serverResponse.json()).toEqual(mockResponse);
                    });
                }));

        it('should catch server error response',
            inject([CollectionInstrumentsService, XHRBackend],
                (collectionInstrumentsService: CollectionInstrumentsService, mockBackend: MockBackend) => {
                    checkCatchServerError(
                        collectionInstrumentsService.loadCollectionInstrumentBatch('400'),
                        mockBackend);
                }));
    });
});
