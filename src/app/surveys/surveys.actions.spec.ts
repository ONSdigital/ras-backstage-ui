import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, async, inject } from '@angular/core/testing';

import { SurveysService } from './surveys.service';
import { SurveysActions } from './surveys.actions';
import { createSurvey_server } from '../../testing/create_Survey';
import { Survey } from './shared/survey.model';

let mockReduxStore: any,
    mockObservable_response: any,
    mockSurveysService: any,
    successResponse: any,
    failResponse = 'Erroring';

const originalLog = console.log;

describe('SurveysActions', () => {

    beforeEach(() => {

        mockReduxStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {}
        };

        successResponse = {
            json() {
                return {};
            }
        };

        mockSurveysService = {
            getSurvey() {
                return mockObservable_response;
            },
            getSurveys() {
                return mockObservable_response;
            }
        };

        spyOn(console, 'log').and.callThrough();
        spyOn(mockReduxStore, 'dispatch');
        spyOn(mockSurveysService, 'getSurvey').and.callThrough();
        spyOn(mockSurveysService, 'getSurveys').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule
            ],
            providers: [
                SurveysActions,
                { provide: NgRedux, useValue: mockReduxStore },
                { provide: SurveysService, useValue: mockSurveysService }
            ]
        });
    });

    afterEach(() => {
        mockSurveysService = undefined;
        mockObservable_response = undefined;
        mockReduxStore = undefined;
        successResponse = {};
        failResponse = 'Erroring';

        console.log = originalLog;
    });

    describe('retrieveSurvey [method]', () => {

        it('should dispatch ' + SurveysActions.RETRIEVE_SINGLE  + ' redux action',
            inject([SurveysActions],
                (surveyActions: SurveysActions) => {
                    mockObservable_response = Observable.of({
                        json(): any {
                            return {};
                        }
                    });

                    surveyActions.retrieveSurvey('100').subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SurveysActions.RETRIEVE_SINGLE,
                        id: '100'
                    });
                }));

        it('should call surveysService getSurvey method to get a survey',
            inject([SurveysActions],
                (surveyActions: SurveysActions) => {
                    mockObservable_response = Observable.of({
                        json(): any {
                            return {};
                        }
                    });

                    surveyActions.retrieveSurvey('200').subscribe();

                    expect(mockSurveysService.getSurvey).toHaveBeenCalledWith('200');
                }));

        describe('after successfully retrieving a survey', () => {

            beforeEach(() => {
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call receivedSurvey',
                inject([SurveysActions],
                    (surveyActions: SurveysActions) => {

                        spyOn(surveyActions, 'receivedSurvey');

                        surveyActions.retrieveSurvey('300').subscribe();

                        expect(surveyActions.receivedSurvey).toHaveBeenCalledWith({});
                    }));
        });

        describe('after failing to retrieve a survey', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([SurveysActions],
                    (surveyActions: SurveysActions) => {

                        surveyActions.retrieveSurvey('400').subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch receivedSurvey action, service error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('receivedSurvey [method]', () => {

        it('should dispatch ' + SurveysActions.RECEIVED_SINGLE  + ' redux action',
            inject([SurveysActions],
                (surveyActions: SurveysActions) => {
                    const mockSurvey: Survey = createSurvey_server();

                    surveyActions.receivedSurvey(mockSurvey);

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: SurveysActions.RECEIVED_SINGLE,
                        survey: mockSurvey
                    });
                }));
    });
});
