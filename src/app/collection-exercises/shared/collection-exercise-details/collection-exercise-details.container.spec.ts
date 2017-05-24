import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsContainerComponent } from './collection-exercise-details.container';

import { createMockCollectionExercise } from '../../../../testing/create_CollectionExercise';

let fixture: ComponentFixture<any>,
    instance: any,
    mockStore: any,
    storeData: any = [];

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

describe('CollectionExerciseDetailsContainerComponent component', () => {

    beforeEach(async(() => {
        mockStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {
                return Observable.of(storeData);
            },
        };

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                CollectionExerciseModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockStore },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({ 'collection-exercise-ref': '100' }),
                        snapshot: {
                            data: {
                                exported: {
                                    collectionInstrumentStatus: {
                                        count: 1,
                                        current: 1,
                                        id: 'c6467711-21eb-4e78-804c-1db8392f93bb',
                                        status: 'pending'
                                    }
                                }
                            }
                        }
                    } 
                }
            ]
        })
        .compileComponents();
    }));

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
        });

        const comp = fixture.debugElement.componentInstance;
        expect(comp).toBeTruthy();
        expect(console.log).toHaveBeenCalledWith('Collection exercise with ref "100" not found in store.');
    }));

    /*it('should use data from data store', async(() => {
        storeData = [createMockCollectionExercise('100')];
        fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
        instance = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(instance.viewModel).toEqual({
                surveyTitle: 'Business Register and Employment Survey',
                inquiryCode: '221',
                referencePeriod: 'The period will appear here',
                surveyAbbr: 'BRES - 2016'
            });

            expect(instance.viewModel).toEqual({
                id: '100',
                surveyTitle: 'Business Register and Employment Survey',
                inquiryCode: '221',
                referencePeriod: CollectionExerciseDetailsContainerComponent.buildReferencePeriod(collectionExercise),
                surveyAbbr: '201601',
                collectionInstrumentBatch: {
                    current: collectionInstrumentBatch.current,
                    status: collectionInstrumentBatch.status
                },
                isButtonDisabled: false,
                csvEndpoint: this.BASE_URL + 'download_csv/' + collectionExercise.id
            });
        });
    }));*/

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

});
