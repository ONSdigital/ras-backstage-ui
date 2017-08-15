import { Observable } from 'rxjs/Observable';
import { TestBed, async, inject } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessageCreateResolver } from './secure-message-create.resolver';
import { PartyService } from '../../party/party.service';

import { MockActivatedRoute } from '../../../testing/ActivatedRouteSnapshot_stub';

let mockRouter: any,
    mockPartyService: any,

    mockRespondent: any,
    mockReportingUnit: any,

    mockRespondentObservable: any,
    mockReportingUnitObservable: any;

function createReportingUnit () {
    return {
        'attributes': {},
        'businessRef': '49900000001',
        'contactName': 'Test User',
        'employeeCount': 50,
        'enterpriseName': 'ABC Limited',
        'facsimile': '+44 1234 567890',
        'fulltimeCount': 35,
        'id': '3b136c4b-7a14-4904-9e01-13364dd7b973',
        'legalStatus': 'Private Limited Company',
        'name': 'Bolts and Ratchets Ltd',
        'sampleUnitType': 'B',
        'sic2003': '2520',
        'sic2007': '2520',
        'telephone': '+44 1234 567890',
        'tradingName': 'ABC Trading Ltd',
        'turnover': 350
    };
}

function createRespondent () {
    return {
        'emailAddress': 'testuser@email.com',
        'firstName': 'Jon',
        'id': 'db036fd7-ce17-40c2-a8fc-932e7c228397',
        'lastName': 'Snow',
        'sampleUnitType': 'BI',
        'telephone': '1234'
    };
}

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

                            mockRespondent = createRespondent();
                            mockReportingUnit = createReportingUnit();

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

                        expect(mockPartyService.getRespondent).not.toHaveBeenCalled();
                        expect(mockPartyService.getBusiness).not.toHaveBeenCalled();
                    }));
        });

        describe('when not supplied a reporting_unit URL parameter', () => {

            let queryParams: any,
                activatedRouteSnapShot: ActivatedRouteSnapshot;

            beforeEach(() => {

                queryParams = {
                    repondent: '200'
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
                    }));
        });
    });
});
