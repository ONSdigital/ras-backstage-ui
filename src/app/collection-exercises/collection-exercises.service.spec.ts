import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CollectionExercisesService } from './collection-exercises.service';
import { CollectionExerciseListViewModel, CollectionExercise } from './shared/collection-exercise.model';

// import { VIMEO_API_URL } from '../config';

describe('CollectionExercisesService', () => {

    const mockResponse = {
        'collectionExercise': {
            'id': '100',
            'link': 'bres-2016',
            'period': {
                'type': 'annual',
                'abbr': '2016',
                'from': {
                    'day': '01',
                    'month': '01',
                    'year': '2016'
                },
                'to': {
                    'day': '31',
                    'month': '12',
                    'year': '2016'
                }
            },
            'surveyId': '500',
            'collectionInstrumentBundleIds': ['700']
        }
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [

                CollectionExercisesService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    it('should correctly retrieve a single collection exercise',
        inject([CollectionExercisesService, XHRBackend],
            (collectionExercisesService: CollectionExercisesService, mockBackend: MockBackend) => {

                // TODO update any type
                mockBackend.connections.subscribe((connection: any) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                collectionExercisesService.getCollectionExercise('100')
                    .subscribe((collectionExercise: CollectionExercise) => {

                        // TODO remove this
                        console.log('XXXXXXX:');
                        console.log(collectionExercise);
                        console.log(collectionExercise.id);
                        console.log(mockResponse.collectionExercise.id);


                        expect(collectionExercise.id).toBe(mockResponse.collectionExercise.id);

                        // TODO test other properties
                        // expect(collectionExercise.link).toBe('bres-2016');
                        // expect(videos[1].name).toEqual('Video 1');
                        // expect(videos[2].name).toEqual('Video 2');
                        // expect(videos[3].name).toEqual('Video 3');
                    });

            }));

    it('should correctly retrieve a list of collection exercises', () => {

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
