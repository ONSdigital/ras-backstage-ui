import { Observable } from 'rxjs/Observable';
import { CollectionExerciseDetailsResolver } from './collection-exercise-details-resolver.service';

let mockCollectionExercisesActions: any,
    mockCollectionInstrumentsService: any,
    resolverSvc: any;

describe('CollectionExerciseDetailsResolver service', () => {

    beforeEach(() => {
        mockCollectionExercisesActions = {
            retrieveCollectionExercise: function(ref: string) {
                return Observable.of({
                    data: {
                        collectionExercise: {
                            'urn': 'BRES',
                            'link': 'bres-2016',
                            'period': {
                                'type': 'annual',
                                'abbr': '2016',
                                'from': {
                                    'day': '1',
                                    'month': 'Jan',
                                    'year': '2016'
                                },
                                'to': {
                                    'day': '31',
                                    'month': 'Dec',
                                    'year': '2016'
                                }
                            },
                            'surveyId': '500',
                            'collectionInstrumentBundleIds': ['700']
                        }
                    }
                });
            }
        };

        // TODO
        mockCollectionInstrumentsService = {};

        resolverSvc = new CollectionExerciseDetailsResolver(mockCollectionExercisesActions, mockCollectionInstrumentsService);
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

    describe('Helper methods', () => {
        it('should correctly format a collection exercise reference period', () => {

            // TODO

        });
    });

});
