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
import { CollectionInstrumentsService } from "./collection-instruments.service";

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

    });

    describe('loadCollectionInstrumentBatch [method]', () => {

    });
});
