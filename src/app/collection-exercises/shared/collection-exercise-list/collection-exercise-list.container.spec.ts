import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import Jasmine = jasmine.Jasmine;
import { Observable } from 'rxjs';

import { CollectionExerciseModule } from '../../collection-exercises.module';
import { CollectionExerciseListContainer } from './collection-exercise-list.container';

let fixture:ComponentFixture<any>,
    instance:any,
    route:any;


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
    }
}

describe('CollectionExerciseListContainer component', () => {

    describe('when testing a default component setup', () => {

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [
                    RouterTestingModule,
                    CollectionExerciseModule
                ]
            })
            .compileComponents();
        }));

        it('should create the component', async(() => {
            fixture = TestBed.createComponent(CollectionExerciseListContainer);
            instance = fixture.componentInstance;

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();
            });

            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        }));

        it('should assign view model data from activated route', inject([ActivatedRoute], (activatedRoute:ActivatedRoute) => {
            let routeData = createActivatedRouteData();

            fixture = TestBed.createComponent(CollectionExerciseListContainer);
            instance = fixture.componentInstance;

            fixture.detectChanges();
            instance.routeSubscription.next(routeData);

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(instance.viewModel).toEqual(routeData.viewModel);
            });
        }));

    });

});
