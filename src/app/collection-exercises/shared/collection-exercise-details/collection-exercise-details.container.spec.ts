import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseDetailsContainerComponent } from './collection-exercise-details.container';

let fixture: ComponentFixture<any>,
    instance: any;

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
        TestBed.configureTestingModule({
            imports: [
                NgReduxModule,
                RouterTestingModule,
                CollectionExerciseModule
            ]
        })
        .compileComponents();
    }));

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

    it('should assign view model data from activated route', async(() => {
        const routeData = createActivatedRouteData();

        fixture = TestBed.createComponent(CollectionExerciseDetailsContainerComponent);
        instance = fixture.componentInstance;

        fixture.detectChanges();
        instance.routeSubscription.next(routeData);

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(instance.viewModel).toEqual(routeData.viewModel);
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
