import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { CollectionInstrument } from './shared/collection-instrument.model';
import { CollectionInstrumentsService } from './collection-instruments.service';

@Injectable()
export class CollectionInstrumentsActions {

    static LOAD_COLLECTION_INSTRUMENT_BATCH = 'COLLECTION_INSTRUMENT_BATCH_LOAD';
    static LOADED_COLLECTION_INSTRUMENT_BATCH = 'COLLECTION_INSTRUMENT_BATCH_LOADED';

    constructor(
        private ngRedux: NgRedux<any>,
        private collectionInstrumentsService: CollectionInstrumentsService) {}

    public loadCollectionInstrumentBatch(id: string): Observable<any> {

        this.ngRedux.dispatch({
            type: CollectionInstrumentsActions.LOAD_COLLECTION_INSTRUMENT_BATCH,
            id: id
        });

        const observable = this.collectionInstrumentsService.loadCollectionInstrumentBatch(id)
            .share();

        observable.subscribe(
            (res: any) => {
                this.loadedCollectionInstrumentBatch(id);
            },
            (err: any) => console
                .log('Could not dispatch loadedCollectionInstrumentBatch action, service error: ', err)
        );

        return observable;
    }

    public loadedCollectionInstrumentBatch(id: string) {

        this.ngRedux.dispatch({
            type: CollectionInstrumentsActions.LOADED_COLLECTION_INSTRUMENT_BATCH,
            id: id
        });
    }
}
