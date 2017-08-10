import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Respondent, Business } from '../../party/party.model';
import { PartyService } from '../../party/party.service';

@Injectable()
export class SecureMessageCreateResolver implements Resolve<Observable<any>> {

    constructor(
        private router: Router,
        private partyService: PartyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const exported: any = {};
        const respondentId: string = route.queryParams.respondent; // 'db036fd7-ce17-40c2-a8fc-932e7c228397'
        const reportingUnitId: string = route.queryParams.reporting_unit; // '3b136c4b-7a14-4904-9e01-13364dd7b973'
        const respondentCaseId: string = route.queryParams.respondent_case;
        const surveyId: string = route.queryParams.survey;
        const collectionExerciseId: string = route.queryParams.collection_exercise;

        if (!respondentId) {
            console.log('\'respondent\' parameter not found in URL query');
            this.router.navigate(['/404']);
            return;
        }

        if (!reportingUnitId) {
            console.log('\'reporting_unit\' parameter not found in URL query');
            this.router.navigate(['/404']);
            return;
        }

        if (surveyId) {
            exported.surveyId = surveyId;
        }

        if (collectionExerciseId) {
            exported.collectionExerciseId = collectionExerciseId;
        }

        if (respondentCaseId) {
            exported.respondentCaseId = respondentCaseId;
        }

        const reportingUnitObservable = this.partyService.getBusiness(reportingUnitId).share();
        const respondentObservable = this.partyService.getRespondent(respondentId).share();

        const resolve = Observable
            .zip(
                reportingUnitObservable
                    .map((res: any) => res.json()),
                respondentObservable
                    .map((res: any) => res.json()),
                (reportingUnit: Business, respondent: Respondent) => (Object.assign(exported, {
                    reportingUnit,
                    respondent
                }))
            )
            .share();

        reportingUnitObservable.subscribe(
            data => {},
            (err: any) => {
                console.log('Reporting unit ' + reportingUnitId + ' not found in party service, error: ', err);
                this.router.navigate(['/404']);
            }
        );

        respondentObservable.subscribe(
            data => {},
            (err: any) => {
                console.log('Respondent ' + respondentId + ' not found in party service, error: ', err);
                this.router.navigate(['/404']);
            }
        );

        return resolve;
    }
}
