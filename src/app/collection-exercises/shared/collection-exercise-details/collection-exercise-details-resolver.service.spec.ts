import { Observable } from 'rxjs/Observable';
import { CollectionExerciseDetailsResolver } from './collection-exercise-details-resolver.service';

let mockCollectionExercisesActions: any,
    resolverSvc: any;

describe('CollectionExerciseDetailsResolver service', () => {

    beforeEach(() => {
        mockCollectionExercisesActions = {
            retrieveCollectionExercise: function(ref: string) {
                return Observable.of({
                    data: {
                        collectionExercise: {
                            'id': 100,
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
                                    'day': '01',
                                    'month': '01',
                                    'year': '2016'
                                }
                            }
                        }
                    }
                });

                // TODO fix this test
                // return Promise.resolve({
                //     data: {
                //         collectionExercise: {
                //             period: '01 Jan',
                //             '@survey': {
                //                 name: 'Test survey',
                //                 inquiryCode: '987',
                //                 abbr: 'ABC'
                //             }
                //         }
                //     }
                // });
            }
        };

        resolverSvc = new CollectionExerciseDetailsResolver(mockCollectionExercisesActions);
    });

    describe('resolve [method]', () => {

        it('should call the collection exercises service to retrieve a collection exercise', () => {
            spyOn(mockCollectionExercisesActions, 'retrieveCollectionExercise').and.callThrough();

            resolverSvc.resolve({
                params: {
                    'collection-exercise-ref': 100
                }
            });

            expect(mockCollectionExercisesActions.retrieveCollectionExercise).toHaveBeenCalled();
            expect(mockCollectionExercisesActions.retrieveCollectionExercise).toHaveBeenCalledWith(100);
        });
    });

});
