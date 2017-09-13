import { Injectable } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import {
    Headers,
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { createSurvey_server } from '../../testing/create_Survey';

import { AuthenticationService } from '../authentication/authentication.service';
import { SurveysService } from './surveys.service';
import { Survey } from './shared/survey.model';

import { checkCatchServerError } from '../../testing/utils';

let mockSurvey: any,
    mockAuthenticationService: any;

describe('SurveysService', () => {

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
                SurveysService,
                { provide: XHRBackend, useClass: MockBackend },
                { provide: AuthenticationService, useValue: mockAuthenticationService }
            ]
        });
    });

    describe('getSurvey [method]', () => {

        it('should GET a survey from the service',
            inject([SurveysService, XHRBackend],
                (surveysService: SurveysService, mockBackend: MockBackend) => {
                    mockSurvey = createSurvey_server();

                    mockBackend.connections.subscribe((connection: any) => {
                        connection.mockRespond(
                            new Response(
                                new ResponseOptions({
                                    body: JSON.stringify(mockSurvey)
                                })));
                    });

                    const mockServiceCall = surveysService.getSurvey('cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87');

                    mockServiceCall.subscribe((serverResponse: any) => {
                        expect(serverResponse.json()).toEqual(mockSurvey);
                    });
                }));

        it('should catch server error response',
            inject([SurveysService, XHRBackend],
                (surveysService: SurveysService, mockBackend: MockBackend) => {
                    checkCatchServerError(
                        surveysService.getSurvey('invalid-uuid'),
                        mockBackend);
                }));
    });

    describe('getSurveys [method]', () => {

        it('should GET a list of surveys from the service',
            inject([SurveysService, XHRBackend],
                (surveysService: SurveysService, mockBackend: MockBackend) => {
                    const mockSurveyList: Survey[] = [
                        createSurvey_server(),
                        createSurvey_server(),
                        createSurvey_server()
                    ];

                    mockBackend.connections.subscribe((connection: any) => {
                        connection.mockRespond(
                            new Response(
                                new ResponseOptions({
                                    body: JSON.stringify(mockSurveyList)
                                })));
                    });

                    const mockServiceCall = surveysService.getSurveys();

                    mockServiceCall.subscribe((serverResponse: any) => {
                        expect(serverResponse.json()).toEqual(mockSurveyList);
                    });
                }));

        it('should catch server error response',
            inject([SurveysService, XHRBackend],
                (surveysService: SurveysService, mockBackend: MockBackend) => {
                    checkCatchServerError(
                        surveysService.getSurveys(),
                        mockBackend);
                }));
    });
});
