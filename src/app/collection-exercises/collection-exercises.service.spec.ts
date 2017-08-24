import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpModule, Headers, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { MockBackend } from '@angular/http/testing';
import { CollectionExercisesService } from './collection-exercises.service';
import { CollectionExercise } from './shared/collection-exercise.model';

import { AuthenticationService } from '../authentication/authentication.service';

let mockRouter: any,
    mockAuthenticationService: any;

describe('CollectionExercisesService', () => {

    const mockCollectionExercise: CollectionExercise = {
        id: 'c6467711-21eb-4e78-804c-1db8392f93fb',
        surveyId: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
        name: '201601',
        actualExecutionDateTime: '2017-05-15T14:20:24Z',
        scheduledExecutionDateTime: '2017-05-15T00:00:00Z',
        scheduledStartDateTime: '2017-06-01T00:00:00Z',
        actualPublishDateTime: null,
        periodStartDateTime: '2017-06-01T00:00:00Z',
        periodEndDateTime: '2017-05-15T00:00:00Z',
        scheduledReturnDateTime: '2017-06-30T00:00:00Z',
        scheduledEndDateTime: '2017-12-31T00:00:00Z',
        executedBy: 'Fred Bloggs',
        state: 'EXECUTED',
        caseTypes: [
            {
                sampleUnitType: 'B',
                actionPlanId: '60df56d9-f491-4ac8-b256-a10154290a8b'
            }, {
                sampleUnitType: 'BI',
                actionPlanId: 'b1f46e33-a3ef-4e50-939d-c18f8a9f11bb'
            }
        ]
    };

    beforeEach(() => {

        mockRouter = {
            navigation: function () {}
        };

        mockAuthenticationService = {
            encryptedHeaders: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };

        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: AuthenticationService, useValue: mockAuthenticationService },
                CollectionExercisesService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    it('should correctly retrieve a single collection exercise',
        inject([CollectionExercisesService, XHRBackend],
            (collectionExercisesService: CollectionExercisesService, mockBackend: MockBackend) => {

                mockBackend.connections.subscribe((connection: any) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockCollectionExercise)
                    })));
                });

                collectionExercisesService.getCollectionExercise('100')
                    .subscribe((collectionExercise: CollectionExercise) => {
                        expect(collectionExercise.id).toBe(mockCollectionExercise.id);
                        expect(collectionExercise.surveyId).toBe(mockCollectionExercise.surveyId);

                        // TODO test other properies
                    });

            }));

    it('should correctly retrieve a list of collection exercises', () => {

        // TODO
        // service.getCollectionExercises().then(value => {
        //
        //     const collectionExercises = value.data.collectionExercises;
        //
        //     expect(collectionExercises.length).toBe(5);
        //
        //     expect(collectionExercises[0].id).toBe('100');
        //     expect(collectionExercises[1].id).toBe('101');
        //     expect(collectionExercises[2].id).toBe('102');
        //     expect(collectionExercises[3].id).toBe('103');
        //     expect(collectionExercises[4].id).toBe('104');
        // });
    });
});
