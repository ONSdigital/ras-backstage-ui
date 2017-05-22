import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { CollectionInstrument } from './shared/collection-instrument.model';
import { CollectionInstrumentsService } from './collection-instruments.service';

@Injectable()
export class CollectionInstrumentActions {

    static LOAD_COLLECTION_INSTRUMENT_BATCH = 'COLLECTION_INSTRUMENT_BATCH_LOAD';

    constructor(
        private ngRedux: NgRedux<any>,
        private collectionInstrumentsService: CollectionInstrumentsService) { }

    public loadCollectionInstrumentBundle(id: string) {

        this.ngRedux.dispatch({
            type: CollectionInstrumentActions.LOAD_COLLECTION_INSTRUMENT_BATCH,
            id: id
        });

        return this.collectionInstrumentsService.loadCollectionInstrumentBatch(id);
    }

    // public retrieveSurvey(id: string) {
    //
    //     this.ngRedux.dispatch({
    //         type: SurveysActions.RETRIEVE_SINGLE,
    //         id: id
    //     });
    //
    //     const observable = this.surveysService.getSurvey(id);
    //
    //     observable.subscribe(
    //         // Normalise data first to keep entities in data store dry before saving
    //         // Update data store
    //         (survey: Survey) => {
    //             this.receivedSurvey(survey);
    //         }
    //     );
    //     return observable;
    // }
    //
    // public receivedSurvey(survey: Survey) {
    //
    //     this.ngRedux.dispatch({
    //         type: SurveysActions.RECEIVED_SINGLE,
    //         survey: survey
    //     });
    // }
}
