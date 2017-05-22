import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { CollectionInstrument } from './shared/collection-instrument.model';
import { CollectionInstrumentsService } from './collection-instruments.service';

@Injectable()
export class CollectionInstrumentActions {

    // static GET_CI_STATUS = 'SURVEY_RETRIEVE';
    // static RECEIVED_SINGLE = 'SURVEY_RECEIVED';
    // static RETRIEVE_ALL = 'SURVEYS_RETRIEVE_ALL';
    // static RECEIVED_ALL = 'SURVEYS_RECEIVED_ALL';

    constructor(
        private ngRedux: NgRedux<any>,
        private collectionInstrumentsService: CollectionInstrumentsService) { }

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
