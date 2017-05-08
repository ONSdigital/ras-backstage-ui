import { CollectionExerciseDetailsResolver } from './collection-exercise-details-resolver.service';

let mockCollectionExercisesActions: any,
    resolverSvc: any;

describe('CollectionExerciseDetailsResolver service', () => {

    beforeEach(() => {
        mockCollectionExercisesActions = {
            retrieveCollectionExercise: function (ref: string) {
                return Promise.resolve({
                    data: {
                        collectionExercise: {
                            period: '01 Jan',
                            '@survey': {
                                name: 'Test survey',
                                inquiryCode: '987',
                                abbr: 'ABC'
                            }
                        }
                    }
                });
            }
        };

        resolverSvc = new CollectionExerciseDetailsResolver(mockCollectionExercisesActions);
    });

    describe('resolve [method]', () => {

        it('should call the collection exercises service to retrieve a collection exercise', () => {
            spyOn(mockCollectionExercisesActions, 'retrieveCollectionExercise').and.callThrough();

            resolverSvc.resolve({
                params: {
                    id: 123
                }
            });

            expect(mockCollectionExercisesActions.retrieveCollectionExercise).toHaveBeenCalled();
            expect(mockCollectionExercisesActions.retrieveCollectionExercise).toHaveBeenCalledWith(123);
        });
    });

});
