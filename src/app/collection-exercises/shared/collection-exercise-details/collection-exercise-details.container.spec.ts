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

import { createSurvey_server } from '../../../../testing/create_Survey';
import { createMockCollectionExercise } from '../../../../testing/create_CollectionExercise';

let fixture: ComponentFixture<any>,
    instance: any,
    mockStore: any,
    storeData: any = [],

    mockCollectionInstrumentsActions: any,
    mockCollectionExercise: any,
    mockCollectionInstrumentStatus: any,
    mockStoreData_observable: any;

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

const originalConsoleLog = console.log;

describe('CollectionExerciseDetailsContainerComponent component', () => {

    beforeEach(() => {

        spyOn(console, 'log').and.callThrough();

        mockStoreData_observable = Observable.of(storeData);

        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return mockStoreData_observable;
            },
        };

        mockCollectionInstrumentsActions = {
            loadCollectionInstrumentBatch() {
                return Observable.of('test status');
            }
        };

        spyOn(mockCollectionInstrumentsActions, 'loadCollectionInstrumentBatch').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                CollectionExerciseModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockStore },
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
        mockRouteSnapshot.data = {};
        storeData = [];

        console.log = originalConsoleLog;
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

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const comp = fixture.debugElement.componentInstance;
            expect(comp).toBeTruthy();
            expect(comp.viewModel).toEqual(undefined);
            // expect(console.log).toHaveBeenCalledWith('Collection exercise with ref "100" not found in store.');
        });
    }));

    describe('when a collection exercise exists in the store', () => {

        beforeEach(() => {
            mockCollectionExercise = createMockCollectionExercise('100');

            storeData = [mockCollectionExercise];

            mockStoreData_observable = Observable.of(storeData);
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
                    mockRouteSnapshot.data.exported.survey = createSurvey_server();
                });

                it('should use data from data store and route to build view', async(() => {
                    fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
                    instance = fixture.componentInstance;

                    spyOn(instance, 'createViewModel').and.callThrough();

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        expect(instance.createViewModel).toHaveBeenCalled();

                        expect(instance.viewModel).toEqual({
                            id: mockCollectionExercise.id,
                            surveyTitle: mockRouteSnapshot.data.exported.survey.longName,
                            inquiryCode: mockRouteSnapshot.data.exported.survey.surveyRef,
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

                describe('and failing to retrieve a collection exercise from the data store', () => {

                    const collectionExerciseFailErr = 'Could not retrieve collection exercise from data store';

                    beforeEach(() => {
                        mockStoreData_observable = Observable.throw(collectionExerciseFailErr);
                    });

                    it('should log error to console', async(() => {
                        fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
                        instance = fixture.componentInstance;

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            expect(console.log).toHaveBeenCalledWith('Error: ', collectionExerciseFailErr);
                        });
                    }));
                });

                describe('and collection exercise model does not exist in the data store', () => {

                    beforeEach(() => {
                        storeData = [];
                        mockStoreData_observable = Observable.of(storeData);
                    });

                    checkViewModelNotCreated();

                    it('should log error to console', async(() => {
                        fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
                        instance = fixture.componentInstance;

                        fixture.detectChanges();
                        fixture.whenStable().then(() => {
                            fixture.detectChanges();

                            expect(console.log)
                                .toHaveBeenCalledWith('Collection exercise with ref "100" not found in store.');
                        });
                    }));
                });
            });

            describe('and survey is not successfully retrieved from the service', () => {

                checkViewModelNotCreated();
            });
        });

        describe('and collectionInstrumentStatus is not exported on route', () => {

            beforeEach(() => {
                mockCollectionInstrumentStatus = createCollectionInstrumentStatus();
                mockRouteSnapshot.data = {
                    exported: {}
                };
            });

            checkViewModelNotCreated();

            it('should log error to console', async(() => {
                fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(console.log)
                        .toHaveBeenCalledWith(
                            'collectionInstrumentStatus not found on route data: ',
                            mockRouteSnapshot.data);
                });
            }));
        });

        describe('and the collectionInstrumentBatchLoadClick_handler method is invoked', () => {

            it('should call loadCollectionInstrumentBatch action on CollectionInstrumentsActions',
                async(() => {

                mockRouteSnapshot.data = {
                    exported: {
                        collectionInstrumentStatus: createCollectionInstrumentStatus(),
                        survey: createSurvey_server()
                    }
                };

                mockCollectionExercise = createMockCollectionExercise('100');

                storeData = [mockCollectionExercise];

                mockStoreData_observable = Observable.of(storeData);

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
    });

    describe('when exported data is not found on route', () => {

        it('should log error to console', async(() => {
            fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
            instance = fixture.componentInstance;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                expect(console.log).toHaveBeenCalledWith(
                    'exported data not found on route: ',
                    mockRouteSnapshot.data);
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
