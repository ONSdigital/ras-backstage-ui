import { Observable } from 'rxjs/Observable';
import { TestBed, inject } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessageCreateResolver } from './secure-message-create.resolver';
import { PartyService } from '../../party/party.service';

import { createRespondent_server } from '../../../testing/create_Respondent';
import { createReportingUnit_server } from '../../../testing/create_RerportingUnit';
import { MockActivatedRoute } from '../../../testing/ActivatedRouteSnapshot_stub';

let mockRouter: any,
    mockPartyService: any,

    mockRespondent: any,
    mockReportingUnit: any,

    mockRespondentObservable: any,
    mockReportingUnitObservable: any;

const originalConsoleLog = console.log;

describe('SecureMessageCreateResolver', () => {

    beforeEach(() => {

        mockRouter = {
            navigate: function () {}
        };

        mockPartyService = {
            getBusiness: function () {
                return mockRespondentObservable;
            },
            getRespondent: function () {
                return mockReportingUnitObservable;
            }
        };

        mockRespondentObservable = Observable.of({
            json: function () {
                return mockReportingUnit;
            }
        });

        mockReportingUnitObservable = Observable.of({
            json: function () {
                return mockRespondent;
            }
        });

        spyOn(console, 'log').and.callThrough();
        spyOn(mockPartyService, 'getBusiness').and.callThrough();
        spyOn(mockPartyService, 'getRespondent').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SecureMessagesModule
            ],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: PartyService, useValue: mockPartyService }
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        mockReportingUnit = undefined;
        mockRespondent = undefined;
        console.log = originalConsoleLog;
    });

    describe('resolve [method]', () => {

        describe('when supplied a respondent & reporting_unit URL parameter', () => {

            let queryParams: any,
                activatedRouteSnapShot: ActivatedRouteSnapshot;

            beforeEach(() => {

                queryParams = {
                    respondent: '100',
                    reporting_unit: '101'
                };

                activatedRouteSnapShot = new MockActivatedRoute();
                activatedRouteSnapShot.queryParams = queryParams;
            });

            it('should call the party service to fetch a respondent and reporting unit',
                inject([SecureMessageCreateResolver],
                    (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                        secureMessageCreateResolver.resolve(activatedRouteSnapShot);

                        expect(mockPartyService.getRespondent).toHaveBeenCalled();
                        expect(mockPartyService.getBusiness).toHaveBeenCalled();
                    }));

            describe('and respondent & reporting_unit is found in the service', () => {

                it('should return an observable that resolves with correct exported data',
                    inject([SecureMessageCreateResolver],
                        (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                            mockRespondent = createRespondent_server();
                            mockReportingUnit = createReportingUnit_server();

                            secureMessageCreateResolver.resolve(activatedRouteSnapShot)
                                .subscribe((exportedData: any) => {
                                    expect(exportedData).toEqual({
                                        respondent: mockRespondent,
                                        reportingUnit: mockReportingUnit
                                    });
                                });
                        }));
            });

            describe('and respondent is not found in the service', () => {

                it('should throw observable error',
                    inject([SecureMessageCreateResolver],
                        (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                            let errored = false;

                            mockRespondentObservable = Observable.throw('Error');

                            secureMessageCreateResolver.resolve(activatedRouteSnapShot)
                                .subscribe(
                                    () => {},
                                    () => errored = true,
                                    () => {
                                        expect(errored).toEqual(true);
                                    }
                                );
                        }));
            });

            describe('and reporting unit is not found in the service', () => {

                it('should throw observable error',
                    inject([SecureMessageCreateResolver],
                        (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                            let errored = false;

                            mockReportingUnitObservable = Observable.throw('Error');

                            secureMessageCreateResolver.resolve(activatedRouteSnapShot)
                                .subscribe(
                                    () => {},
                                    () => errored = true,
                                    () => {
                                        expect(errored).toEqual(true);
                                    }
                                );
                        }));
            });
        });

        describe('when not supplied a respondent URL parameter', () => {

            let queryParams: any,
                activatedRouteSnapShot: ActivatedRouteSnapshot;

            beforeEach(() => {

                queryParams = {
                    reporting_unit: '201'
                };

                activatedRouteSnapShot = new MockActivatedRoute();
                activatedRouteSnapShot.queryParams = queryParams;
            });

            it('should not call the party service',
                inject([SecureMessageCreateResolver],
                    (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                        secureMessageCreateResolver.resolve(activatedRouteSnapShot);

                        expect(console.log).toHaveBeenCalledWith('\'respondent\' parameter not found in ' +
                            'URL query params: ', queryParams);
                        expect(mockPartyService.getRespondent).not.toHaveBeenCalled();
                        expect(mockPartyService.getBusiness).not.toHaveBeenCalled();
                    }));
        });

        describe('when not supplied a reporting_unit URL parameter', () => {

            let queryParams: any,
                activatedRouteSnapShot: ActivatedRouteSnapshot;

            beforeEach(() => {

                queryParams = {
                    respondent: '200'
                };

                activatedRouteSnapShot = new MockActivatedRoute();
                activatedRouteSnapShot.queryParams = queryParams;
            });

            it('should not call the party service',
                inject([SecureMessageCreateResolver],
                    (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                        secureMessageCreateResolver.resolve(activatedRouteSnapShot);

                        expect(mockPartyService.getRespondent).not.toHaveBeenCalled();
                        expect(mockPartyService.getBusiness).not.toHaveBeenCalled();
                        expect(console.log).toHaveBeenCalledWith('\'reporting_unit\' parameter not found in ' +
                            'URL query params: ', queryParams);
                    }));
        });

        describe('when supplied a survey id', () => {

            let queryParams: any,
                activatedRouteSnapShot: ActivatedRouteSnapshot;

            beforeEach(() => {

                queryParams = {
                    respondent: '300',
                    reporting_unit: '301',
                    survey: '302'
                };

                activatedRouteSnapShot = new MockActivatedRoute();
                activatedRouteSnapShot.queryParams = queryParams;
            });

            it('should attach survey id in the observable response',
                inject([SecureMessageCreateResolver],
                    (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                        secureMessageCreateResolver.resolve(activatedRouteSnapShot)
                            .subscribe(
                                (res: any) => {
                                    expect(res.surveyId).toEqual(queryParams.survey);
                                },
                                () => {}
                            );
                    }));
        });

        describe('when supplied a collection exercise id', () => {

            let queryParams: any,
                activatedRouteSnapShot: ActivatedRouteSnapshot;

            beforeEach(() => {

                queryParams = {
                    respondent: '400',
                    reporting_unit: '401',
                    collection_exercise: '402'
                };

                activatedRouteSnapShot = new MockActivatedRoute();
                activatedRouteSnapShot.queryParams = queryParams;
            });

            it('should attach collection exercise id in the observable response',
                inject([SecureMessageCreateResolver],
                    (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                        secureMessageCreateResolver.resolve(activatedRouteSnapShot)
                            .subscribe(
                                (res: any) => {
                                    expect(res.collectionExerciseId).toEqual(queryParams.collection_exercise);
                                },
                                () => {}
                            );
                    }));
        });

        describe('when supplied a respondent case id', () => {

            let queryParams: any,
                activatedRouteSnapShot: ActivatedRouteSnapshot;

            beforeEach(() => {

                queryParams = {
                    respondent: '500',
                    reporting_unit: '501',
                    respondent_case: '502'
                };

                activatedRouteSnapShot = new MockActivatedRoute();
                activatedRouteSnapShot.queryParams = queryParams;
            });

            it('should attach respdondent case id in the observable response',
                inject([SecureMessageCreateResolver],
                    (secureMessageCreateResolver: SecureMessageCreateResolver) => {

                        secureMessageCreateResolver.resolve(activatedRouteSnapShot)
                            .subscribe(
                                (res: any) => {
                                    expect(res.collectionExerciseId).toEqual(queryParams.respondentCaseId);
                                },
                                () => {}
                            );
                    }));
        });
    });
});
