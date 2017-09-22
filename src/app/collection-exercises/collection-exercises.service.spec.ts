import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpModule, Headers, Response, ResponseOptions, XHRBackend } from '@angular/http';

import { MockBackend } from '@angular/http/testing';
import { CollectionExercisesService } from './collection-exercises.service';
import { CollectionExercise } from './shared/collection-exercise.model';

import { AuthenticationService } from '../authentication/authentication.service';

import { createMockCollectionExercise } from '../../testing/create_CollectionExercise';

let mockRouter: any,
    mockAuthenticationService: any;

describe('CollectionExercisesService', () => {

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

    describe('getCollectionExercise [method]', () => {

        it('should correctly retrieve a single collection exercise',
            inject([CollectionExercisesService, XHRBackend],
                (collectionExercisesService: CollectionExercisesService, mockBackend: MockBackend) => {

                    const mockCollectionExercise: CollectionExercise = createMockCollectionExercise('100');

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
    });

    describe('getCollectionExercises [method]', () => {

        it('should correctly retrieve a single collection exercise',
            inject([CollectionExercisesService, XHRBackend],
                (collectionExercisesService: CollectionExercisesService, mockBackend: MockBackend) => {

                    const items = [
                        createMockCollectionExercise('100'),
                        createMockCollectionExercise('200')
                    ];

                    mockBackend.connections.subscribe((connection: any) => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify(items)
                        })));
                    });

                    collectionExercisesService.getCollectionExercises()
                        .subscribe((collectionExercises: Array<CollectionExercise>) => {
                            expect(collectionExercises.length).toEqual(2);
                            expect(collectionExercises).toEqual(items);
                        });

                }));
    });
});
