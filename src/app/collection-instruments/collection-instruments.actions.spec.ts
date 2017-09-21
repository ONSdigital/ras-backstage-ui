import { Observable } from 'rxjs/Observable';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { TestBed, inject } from '@angular/core/testing';

import { CollectionInstrumentsService } from './collection-instruments.service';
import { CollectionInstrumentsActions } from './collection-instruments.actions';

let mockCollectionInstrumentService: any,
    mockReduxStore: any,
    mockObservable_response: any,
    successResponse: any = {},
    failResponse = 'Erroring';

const originalLog = console.log;

describe('CollectionInstrumentsActions', () => {

    beforeEach(() => {

        mockReduxStore = {
            dispatch(action: any) {},
            configureStore() {},
            select() {}
        };

        mockCollectionInstrumentService = {
            loadCollectionInstrumentBatch() {
                return mockObservable_response;
            }
        };

        spyOn(console, 'log').and.callThrough();
        spyOn(mockReduxStore, 'dispatch');
        spyOn(mockCollectionInstrumentService, 'loadCollectionInstrumentBatch').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                NgReduxModule
            ],
            providers: [
                CollectionInstrumentsActions,
                { provide: NgRedux, useValue: mockReduxStore },
                { provide: CollectionInstrumentsService, useValue: mockCollectionInstrumentService }
            ]
        });
    });

    afterEach(() => {
        mockCollectionInstrumentService = undefined;
        mockObservable_response = undefined;
        mockReduxStore = undefined;
        successResponse = {};
        failResponse = 'Erroring';

        console.log = originalLog;
    });

    describe('loadCollectionInstrumentBatch [method]', () => {

        it('should dispatch ' + CollectionInstrumentsActions.LOAD_COLLECTION_INSTRUMENT_BATCH  +
            ' redux action',
            inject([CollectionInstrumentsActions],
                (secureMessagesActions: CollectionInstrumentsActions) => {
                    mockObservable_response = Observable.of({});

                    secureMessagesActions.loadCollectionInstrumentBatch('100').subscribe();

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: CollectionInstrumentsActions.LOAD_COLLECTION_INSTRUMENT_BATCH,
                        id: '100'
                    });
                }));

        it('should call CollectionInstrumentsService loadCollectionInstrumentBatch method to load ' +
            'collection instruments',
            inject([CollectionInstrumentsActions],
                (collectionInstrumentsActions: CollectionInstrumentsActions) => {
                    mockObservable_response = Observable.of({});

                    collectionInstrumentsActions.loadCollectionInstrumentBatch('200').subscribe();

                    expect(mockCollectionInstrumentService.loadCollectionInstrumentBatch)
                        .toHaveBeenCalledWith('200');
                }));

        describe('after successfully loading a collection instrument batch', () => {

            beforeEach(() => {
                successResponse = '300';
                mockObservable_response = Observable.of(successResponse);
            });

            it('should call loadedCollectionInstrumentBatch',
                inject([CollectionInstrumentsActions],
                    (collectionInstrumentsActions: CollectionInstrumentsActions) => {
                        spyOn(collectionInstrumentsActions, 'loadedCollectionInstrumentBatch');

                        collectionInstrumentsActions.loadCollectionInstrumentBatch('300').subscribe();

                        expect(collectionInstrumentsActions.loadedCollectionInstrumentBatch)
                            .toHaveBeenCalledWith(successResponse);
                    }));
        });

        describe('after failing to create a message', () => {

            beforeEach(() => {
                mockObservable_response = Observable.throw(failResponse);
            });

            it('should log to console',
                inject([CollectionInstrumentsActions],
                    (collectionInstrumentsActions: CollectionInstrumentsActions) => {
                        collectionInstrumentsActions.loadCollectionInstrumentBatch('400').subscribe(
                            () => {},
                            () => {
                                expect(console.log).toHaveBeenCalledWith(
                                    'Could not dispatch loadedCollectionInstrumentBatch action, service ' +
                                        'error: ', failResponse);
                            }
                        );
                    }));
        });
    });

    describe('loadedCollectionInstrumentBatch [method]', () => {

        it('should dispatch ' + CollectionInstrumentsActions.LOADED_COLLECTION_INSTRUMENT_BATCH  +
            ' redux action',
            inject([CollectionInstrumentsActions],
                (collectionInstrumentsActions: CollectionInstrumentsActions) => {
                    collectionInstrumentsActions.loadedCollectionInstrumentBatch('500');

                    expect(mockReduxStore.dispatch).toHaveBeenCalledWith({
                        type: CollectionInstrumentsActions.LOADED_COLLECTION_INSTRUMENT_BATCH,
                        id: '500'
                    });
                }));
    });
});
