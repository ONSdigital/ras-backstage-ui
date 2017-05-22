import { Observable } from 'rxjs/Observable';
import { CollectionExerciseDetailsResolver } from './collection-exercise-details-resolver.service';
import { CollectionExercise } from '../collection-exercise.model';

let mockCollectionExercisesActions: any,
    mockCollectionInstrumentsService: any,
    resolverSvc: any;

describe('CollectionExerciseDetailsResolver service', () => {

    const mockCollectionExercise: CollectionExercise = {
        id: 'c6467711-21eb-4e78-804c-1db8392f93fb',
        surveyID: 'cb0711c3-0ac8-41d3-ae0e-567e5ea1ef87',
        name: '201601',
        actualExecution: '2017-05-15T14:20:24Z',
        scheduledExecution: '2017-05-15T00:00:00Z',
        scheduledStart: '2017-06-01T00:00:00Z',
        actualPublish: null,
        completionFor: null,
        scheduledReturn: '2017-06-30T00:00:00Z',
        scheduledEnd: '2017-12-31T00:00:00Z',
        executedBy: 'Fred Bloggs',
        state: 'EXECUTED',
        caseTypes: [
            {
                sampleUnitType: 'B',
                actionPlanID: '60df56d9-f491-4ac8-b256-a10154290a8b'
            }, {
                sampleUnitType: 'BI',
                actionPlanID: 'b1f46e33-a3ef-4e50-939d-c18f8a9f11bb'
            }
        ]
    };

    const mockCollectionInstrumentBatchPending = {
        id: 'c6467711-21eb-4e78-804c-1db8392f93fb',
        current: 0,
        status: 'pending'
    };

    beforeEach(() => {
        mockCollectionExercisesActions = {
            retrieveCollectionExercise: function(ref: string) {
                return Observable.of({
                    mockCollectionExercise
                });
            }
        };

        mockCollectionInstrumentsService = {
            getStatus: function(collectionExerciseId: string) {
                return Observable.of({
                    mockCollectionInstrumentBatchPending
                });
            }
        };

        resolverSvc = new CollectionExerciseDetailsResolver(mockCollectionExercisesActions, mockCollectionInstrumentsService);
    });

    describe('resolve [method]', () => {

        it('should call the collection exercises service to retrieve a collection exercise', () => {
            spyOn(mockCollectionExercisesActions, 'retrieveCollectionExercise').and.callThrough();

            resolverSvc.resolve({
                params: {
                    'collection-exercise-ref': mockCollectionExercise.id
                }
            });

            expect(mockCollectionExercisesActions.retrieveCollectionExercise).toHaveBeenCalled();
            expect(mockCollectionExercisesActions.retrieveCollectionExercise).toHaveBeenCalledWith(mockCollectionExercise.id);
        });
    });

    it('should call the collection instrument service to retrieve collection instrument details', () => {
        spyOn(mockCollectionInstrumentsService, 'getStatus').and.callThrough();

        resolverSvc.resolve({
            params: {
                'collectionExerciseId': mockCollectionExercise.id
            }
        });

        // TODO fix this
        // expect(mockCollectionInstrumentsService.getStatus).toHaveBeenCalled();
        // expect(mockCollectionInstrumentsService.getStatus).toHaveBeenCalledWith(mockCollectionExercise.id);
    });

    describe('Helper methods', () => {
        it('should correctly format a collection exercise reference period', () => {
            expect(CollectionExerciseDetailsResolver.buildReferencePeriod(mockCollectionExercise)).toEqual('1 Jun 2017 - 31 Dec 2017');
        });
    });
});
