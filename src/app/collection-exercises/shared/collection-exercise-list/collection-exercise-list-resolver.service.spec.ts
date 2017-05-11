import { Observable } from 'rxjs/Observable';
import { CollectionExerciseListResolver } from './collection-exercise-list-resolver.service';

let mockCollectionExercisesActions: any,
    resolverSvc: any;

describe('CollectionExerciseListResolver service', () => {

    beforeEach(() => {
        mockCollectionExercisesActions = {
            retrieveCollectionExercises: function () {

                return Observable.of([{
                    period: '01 Jan',
                    '@survey': {
                        name: 'Test survey',
                        inquiryCode: '987',
                        abbr: 'ABC'
                    }
                }]);
            }
        };

        resolverSvc = new CollectionExerciseListResolver(mockCollectionExercisesActions);
    });

    describe('resolve [method]', () => {

        it('should call the collection exercises service to retrieve a list of collection exercises', () => {
            spyOn(mockCollectionExercisesActions, 'retrieveCollectionExercises').and.callThrough();

            const fakeRouter: any = {};

            resolverSvc.resolve(fakeRouter);

            expect(mockCollectionExercisesActions.retrieveCollectionExercises).toHaveBeenCalled();
        });
    });

});
