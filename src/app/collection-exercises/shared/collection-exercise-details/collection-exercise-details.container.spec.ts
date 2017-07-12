import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsContainerComponent } from './collection-exercise-details.container';

import { environment } from '../../../../environments/environment';

import { SurveysActions } from '../../../surveys/surveys.actions';

import { createMockCollectionExercise } from '../../../../testing/create_CollectionExercise';

let fixture: ComponentFixture<any>,
    instance: any,
    mockSurveysActions: any,
    mockStore: any,
    storeData: any = [],

    mockCollectionExercise: any,
    mockSurvey: any,
    mockCollectionInstrumentStatus: any;

function createActivatedRouteData() {
    return {
        viewModel: createViewModel()
    };
}

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

        mockCollectionInstrumentStatus = createCollectionInstrumentStatus();

        spyOn(mockSurveysActions, 'retrieveSurvey').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                CollectionExerciseModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockStore },
                { provide: SurveysActions, useValue: mockSurveysActions },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({ 'collection-exercise-ref': '100' }),
                        snapshot: {
                            data: {
                                exported: {
                                    collectionInstrumentStatus: mockCollectionInstrumentStatus
                                }
                            }
                        }
                    } 
                }
            ]
        })
        .compileComponents();
    });

    afterEach(() => {
        storeData = [];
    });

    it('should create the component', async(() => {
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

    it('should use data from data store and route to build view', async(() => {
        fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
        instance = fixture.componentInstance;

        mockSurvey = {
            id: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
            longName: 'Some test title',
            shortName: 'STT',
            surveyRef: '123'
        };
        mockCollectionExercise = createMockCollectionExercise('100');

        storeData = [mockCollectionExercise];

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

    it('should load collection instrument bundle when button clicked', async(() => {
        // TODO fix this
        // let button;
        //
        // fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
        // instance = fixture.componentInstance;
        //
        // button = fixture.debugElement.query(By.css('.load-ci-batch-button'));
        // // button = fixture.nativeElement.querySelector('[data-test="LOAD_COLLECTION_INSTRUMENTS_BUTTON"]');
        //
        // storeData = [createMockCollectionExercise('100')];
        //
        // instance.collectionInstrumentsService = {
        //     loadCollectionInstrumentBundle: function () {}
        // };
        //
        // spyOn(instance.collectionInstrumentsService, 'loadCollectionInstrumentBundle');
        //
        // fixture.detectChanges();
        // fixture.whenStable().then(() => {
        //     fixture.detectChanges();
        // });
        //
        // button.triggerEventHandler('click', null);
        //
        // expect(instance.collectionInstrumentsService.loadCollectionInstrumentBundle).toHaveBeenCalled();
    }));

    describe('Helper methods', () => {
        it('should correctly format a collection exercise reference period', () => {
            expect(CollectionExerciseDetailsContainerComponent.buildReferencePeriod(createMockCollectionExercise('999')))
                .toEqual('1 Jun 2017 - 31 Dec 2017');
        });
    });

});
