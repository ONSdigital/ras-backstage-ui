import { Observable } from 'rxjs/Observable';
import { CollectionExerciseListResolver } from './collection-exercise-list-resolver.service';

import { createMockCollectionExercise } from '../../../../testing/create_CollectionExercise';

let mockCollectionExercisesActions: any,
    resolverSvc: any,

    mockCollectionExercises_observable: Observable<any>;

describe('CollectionExerciseListResolver service', () => {

    beforeEach(() => {
        mockCollectionExercisesActions = {
            retrieveCollectionExercises: function () {
                return mockCollectionExercises_observable || Observable.of([createMockCollectionExercise('001')]);
            }
        };

        resolverSvc = new CollectionExerciseListResolver(mockCollectionExercisesActions);
    });

    describe('resolve [method]', () => {

        let fakeRouter: any;

        beforeEach(() => {
            fakeRouter = {};
        });

        it('should call the collection exercises service to retrieve a list of collection exercises', () => {
            spyOn(mockCollectionExercisesActions, 'retrieveCollectionExercises').and.callThrough();

            resolverSvc.resolve(fakeRouter).subscribe();

            expect(mockCollectionExercisesActions.retrieveCollectionExercises).toHaveBeenCalled();
        });

        describe('when successfully getting collection exercises from service', () => {

            const mockCollectionExercises: Array<any> = [
                createMockCollectionExercise('100'),
                createMockCollectionExercise('200')
            ];

            beforeEach(() => {
                mockCollectionExercises_observable = Observable.of(mockCollectionExercises);
            });

            it('should call createViewModel', () => {
                spyOn(resolverSvc, 'createViewModel').and.callThrough();

                resolverSvc.resolve(fakeRouter).subscribe(
                    () => {
                        expect(resolverSvc.createViewModel).toHaveBeenCalledWith(mockCollectionExercises, {
                            id: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
                            surveyRef: '221',
                            longName: 'Business Register and Employment Survey',
                            shortName: 'BRES'
                        });
                    },
                    () => {}
                );
            });
        });

        describe('when failing to get collection exercises from services', () => {

            beforeEach(() => {
                mockCollectionExercises_observable = Observable.throw('Some error');
            });

            it('should not call createViewModel', () => {
                spyOn(resolverSvc, 'createViewModel').and.callThrough();

                resolverSvc.resolve(fakeRouter).subscribe(
                    () => {},
                    () => {
                        expect(resolverSvc.createViewModel).not.toHaveBeenCalled();
                    }
                );
            });
        });
    });
});
