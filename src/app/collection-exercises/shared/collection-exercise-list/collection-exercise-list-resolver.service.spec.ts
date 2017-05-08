import { CollectionExerciseListResolver } from './collection-exercise-list-resolver.service';

let mockCollectionExercisesActions: any,
    resolverSvc: any;

describe('CollectionExerciseListResolver service', () => {

    beforeEach(() => {
        mockCollectionExercisesActions = {
            retrieveCollectionExercises: function () {
                return Promise.resolve();
            }
        };

        resolverSvc = new CollectionExerciseListResolver(mockCollectionExercisesActions);
    });

    describe('resolve [method]', () => {

        it('should call the collection exercises service to retrieve a list of collection exercises', () => {
            spyOn(mockCollectionExercisesActions, 'retrieveCollectionExercises').and.callThrough();

            resolverSvc.resolve({});

            expect(mockCollectionExercisesActions.retrieveCollectionExercises).toHaveBeenCalled();
        });
    });

});
