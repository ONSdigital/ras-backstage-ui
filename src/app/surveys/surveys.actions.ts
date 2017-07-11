import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Survey } from './shared/survey.model';
import { SurveysService } from './surveys.service';

@Injectable()
export class SurveysActions {

    static RETRIEVE_SINGLE = 'SURVEY_RETRIEVE';
    static RECEIVED_SINGLE = 'SURVEY_RECEIVED';
    // static RETRIEVE_ALL = 'SURVEYS_RETRIEVE_ALL';
    // static RECEIVED_ALL = 'SURVEYS_RECEIVED_ALL';

    constructor(
        private ngRedux: NgRedux<any>,
        private surveysService: SurveysService) { }

    public retrieveSurvey(id: string) {

        this.ngRedux.dispatch({
            type: SurveysActions.RETRIEVE_SINGLE,
            id: id
        });

        const observable = this.surveysService.getSurvey(id)
            .share();

        observable.subscribe(
            (survey: Survey) => {
                this.receivedSurvey(survey);
            }
        );

        return observable;
    }

    public receivedSurvey(survey: Survey) {

        this.ngRedux.dispatch({
            type: SurveysActions.RECEIVED_SINGLE,
            survey: survey
        });
    }
}
