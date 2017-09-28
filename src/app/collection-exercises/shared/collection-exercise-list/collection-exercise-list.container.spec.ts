import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/operator/filter';
import Jasmine = jasmine.Jasmine;

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseListContainerComponent } from './collection-exercise-list.container';

let fixture: ComponentFixture<any>,
    instance: any;

const oriiginalConsoleLog = console.log;

function createActivatedRouteData() {
    return {
        viewModel: createViewModel()
    };
}

function createViewModel() {
    return {
        collectionExercises: [
            {
                surveyTitle: 'Some test title',
                inquiryCode: '123',
                referencePeriod: 'Jan - Dec 2017',
                surveyAbbr: 'BRES'
            }
        ]
    };
}

describe('CollectionExerciseListContainerComponent component', () => {

    beforeEach(async(() => {
        spyOn(console, 'log').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                CollectionExerciseModule
            ]
        })
        .compileComponents();
    }));

    afterEach(() => {
        console.log = oriiginalConsoleLog;
    });

    describe('when testing a default component setup', () => {

        it('should create the component', async(() => {
            fixture = TestBed.createComponent(CollectionExerciseListContainerComponent);
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

            fixture = TestBed.createComponent(CollectionExerciseListContainerComponent);
            instance = fixture.componentInstance;

            fixture.detectChanges();
            instance.routeSubscription.next(routeData);

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(instance.viewModel).toEqual(routeData.viewModel);
            });
        }));
    });

    describe('when failing to get route data', () => {

        it('should log error to console', () => {
            fixture = TestBed.createComponent(CollectionExerciseListContainerComponent);
            instance = fixture.componentInstance;

            instance.route.data = Observable.throw('Error reading route data');

            fixture.detectChanges();

            fixture.whenStable().then(() => {
                fixture.detectChanges();

                expect(instance.viewModel).toEqual({collectionExercises: []});
            });
        });
    });
});
