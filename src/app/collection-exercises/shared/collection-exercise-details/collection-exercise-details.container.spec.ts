import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsContainerComponent } from './collection-exercise-details.container';

import { createMockCollectionExercise } from '../../../../testing/mockCollectionExercise';

let fixture: ComponentFixture<any>,
    instance: any,
    mockStore: any,
    storeData: any = [];

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
                RouterTestingModule,
                CollectionExerciseModule
            ],
            providers: [
                { provide: NgRedux, useValue: mockStore },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({ 'collection-exercise-ref': 'abc-123' })
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

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
        });

        const comp = fixture.debugElement.componentInstance;
        expect(comp).toBeTruthy();
    }));

    it('should use data from data store', async(() => {
        storeData = [createMockCollectionExercise('100', 'abc-123')];

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
        });
    }));

    it('should dispatch action to load collection instrument bundle when button clicked', async(() => {
        let button;

        fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
        instance = fixture.componentInstance;

        button = fixture.debugElement.query(By.css('.js_load_cis_click_handler'));

        instance.collectionExerciseActions = {
            loadCollectionInstrumentBundle: function () {}
        };

        spyOn(instance.collectionExerciseActions, 'loadCollectionInstrumentBundle');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
        });

        button.triggerEventHandler('click', null);

        expect(instance.collectionExerciseActions.loadCollectionInstrumentBundle).toHaveBeenCalled();
    }));

});
