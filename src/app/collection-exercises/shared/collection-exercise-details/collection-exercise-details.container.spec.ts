import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsContainerComponent } from './collection-exercise-details.container';

import { environment } from '../../../../environments/environment';

import { CollectionInstrumentsActions } from '../../../collection-instruments/collection-instruments.actions';
import { SurveysActions } from '../../../surveys/surveys.actions';

import { createMockCollectionExercise } from '../../../../testing/create_CollectionExercise';

let fixture: ComponentFixture<any>,
    instance: any,
    mockSurveysActions: any,
    mockStore: any,
    storeData: any = [],

    mockCollectionInstrumentsActions: any,
    mockCollectionExercise: any,
    mockSurvey: any,
    mockCollectionInstrumentStatus: any;

const mockRouteSnapshot: any = {};

function createViewModel() {
    return {
        surveyTitle: 'Some test title',
        inquiryCode: '123',
        referencePeriod: 'Jan - Dec 2017',
        surveyAbbr: 'BRES'
    };
}

function createCollectionInstrumentStatus () {
    return {
        count: 1,
        current: 1,
        id: 'c6467711-21eb-4e78-804c-1db8392f93bb',
        status: 'pending'
    };
}

describe('CollectionExerciseDetailsContainerComponent component', () => {

    beforeEach(() => {
        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(storeData);
            },
        };

        mockSurveysActions = {
            retrieveSurvey (id: string) {
                return Observable.of(mockSurvey);
            }
        };

        mockCollectionInstrumentsActions = {
            loadCollectionInstrumentBatch() {
                return Observable.of('test status');
            }
        };

        spyOn(mockSurveysActions, 'retrieveSurvey').and.callThrough();
        spyOn(mockCollectionInstrumentsActions, 'loadCollectionInstrumentBatch').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                CollectionExerciseModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockStore },
                { provide: SurveysActions, useValue: mockSurveysActions },
                { provide: CollectionInstrumentsActions, useValue: mockCollectionInstrumentsActions },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({ 'collection-exercise-ref': '100' }),
                        snapshot: mockRouteSnapshot
                    } 
                }
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        mockCollectionExercise = undefined;
        mockCollectionInstrumentStatus = undefined;
        mockSurvey = undefined;
        mockRouteSnapshot.data = {};
        storeData = [];
    });

    it('should create the component', async(() => {
        mockCollectionInstrumentStatus = createCollectionInstrumentStatus();
        mockRouteSnapshot.data = {
            exported: {
                collectionInstrumentStatus: mockCollectionInstrumentStatus
            }
        };

        fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
        instance = fixture.componentInstance;

        spyOn(console, 'log').and.callThrough();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const comp = fixture.debugElement.componentInstance;
            expect(comp).toBeTruthy();
            expect(console.log).toHaveBeenCalledWith('Collection exercise with ref "100" not found in store.');
        });
    }));

    describe('when a collection exercise exists in the store', () => {

        beforeEach(() => {
            mockCollectionExercise = createMockCollectionExercise('100');

            storeData = [mockCollectionExercise];
        });

        describe('and collectionInstrumentStatus is exported on route', () => {

            beforeEach(() => {
                mockCollectionInstrumentStatus = createCollectionInstrumentStatus();
                mockRouteSnapshot.data = {
                    exported: {
                        collectionInstrumentStatus: mockCollectionInstrumentStatus
                    }
                };
            });

            describe('and survey exists in the service', () => {

                beforeEach(() => {
                    mockSurvey = {
                        id: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
                        longName: 'Some test title',
                        shortName: 'STT',
                        surveyRef: '123'
                    };
                });

                it('should use data from data store and route to build view', async(() => {
                    fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
                    instance = fixture.componentInstance;

                    spyOn(instance, 'createViewModel').and.callThrough();

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        expect(mockSurveysActions.retrieveSurvey).toHaveBeenCalled();
                        expect(instance.createViewModel).toHaveBeenCalled();

                        expect(instance.viewModel).toEqual({
                            id: mockCollectionExercise.id,
                            surveyTitle: mockSurvey.longName,
                            inquiryCode: mockSurvey.surveyRef,
                            referencePeriod: CollectionExerciseDetailsContainerComponent.buildReferencePeriod(mockCollectionExercise),
                            surveyAbbr: mockCollectionExercise.name,
                            collectionInstrumentBatch: {
                                current: mockCollectionInstrumentStatus.current,
                                status: mockCollectionInstrumentStatus.status
                            },
                            isButtonDisabled: false,
                            csvEndpoint: environment.endpoints.collectionInstrument + 'download_csv/' + mockCollectionExercise.id
                        });
                    });
                }));
            });

            describe('and survey is not successfully retrieved from the service', () => {

                checkViewModelNotCreated();
            });
        });

        describe('and collectionInstrumentStatus is not exported on route', () => {

            checkViewModelNotCreated();
        });
    });

    describe('when a collection exercise does not exist in the store', () => {

        checkViewModelNotCreated();
    });

    describe(('when the collectionInstrumentBatchLoadClick_handler method is invoked'), () => {

        it('should call loadCollectionInstrumentBatch action on CollectionInstrumentsActions', async(() => {
            mockRouteSnapshot.data = {
                exported: {
                    collectionInstrumentStatus: createCollectionInstrumentStatus()
                }
            };

            mockSurvey = {
                id: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
                longName: 'Some test title',
                shortName: 'STT',
                surveyRef: '123'
            };
            mockCollectionExercise = createMockCollectionExercise('100');

            storeData = [mockCollectionExercise];

            fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
            instance = fixture.componentInstance;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                instance.collectionInstrumentBatchLoadClick_handler();

                expect(mockCollectionInstrumentsActions.loadCollectionInstrumentBatch).toHaveBeenCalled();
            });
        }));
    });

    describe('Helper methods', () => {
        it('should correctly format a collection exercise reference period', () => {
            expect(CollectionExerciseDetailsContainerComponent.buildReferencePeriod(createMockCollectionExercise('999')))
                .toEqual('1 Jan 2016 - 31 Dec 2016');
        });
    });

});

function checkViewModelNotCreated () {

    it('should not create a viewModel', async(() => {
        fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
        instance = fixture.componentInstance;

        spyOn(instance, 'createViewModel').and.callThrough();

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(instance.createViewModel).not.toHaveBeenCalled();
        });
    }));
}
