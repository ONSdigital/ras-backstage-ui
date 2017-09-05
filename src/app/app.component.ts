import {Component} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { environment } from '../environments/environment';

import { AuthenticationService } from './authentication/authentication.service';
import { PartyService} from './party/party.service';
import { Business } from './party/party.model';

@Component({
    selector: 'ons-backstage-ui',
    moduleId: module.id, // For aot compiler relative paths

    // styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public path = '';
    public responseOperationsUrl: string;
    public isAuthenticated: Boolean;
    public siteSearchUrl = '';
    public searchEnabled = false;
    public reportingUnitFound = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private partyService: PartyService) {

        /**
         * Used to assist Angular Augury
         */
        router.events.subscribe(
            (val) => {
                this.path = val.url;
            },
            () => {});

        this.init();
    }

    init() {
        this.responseOperationsUrl = environment.endpoints.responseOperationsApplication;

        this.router.events
            .subscribe(
                () => {
                    this.isAuthenticated = this.authenticationService.isAuthenticated();
                },
                (err: any) => console.log('Router error: ', err)
            );
    }

    createSiteSearchFormUrl(event: any) {
        const val: string = event.target.value;
        const ignoreKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'];

        if (ignoreKeys.find((item: string) => event.key === item)) {
            return false;
        }

        this.reportingUnitFound = false;
        this.searchEnabled = val.length !== 0;

        if (val.length === 11) {
            this.searchReportingUnit(val);
        }

        this.siteSearchUrl = this.responseOperationsUrl + 'sampleunitref/' + event.target.value + '/cases';
    }

    searchClick_handler(event: any, siteSearchEl: any) {
        if (!this.searchEnabled) {
            event.preventDefault();
            siteSearchEl.focus();
            return false;
        }
    }

    searchReportingUnit(reference: string) {

        this.partyService.getBusinessByRef(reference)
            .subscribe(
                (business: Business) => {
                    this.reportingUnitFound = true;
                },
                () => console.log('Business not found')
            );
    }
}
