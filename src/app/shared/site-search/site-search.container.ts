import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService } from '../../authentication/authentication.service';
import { PartyService } from '../../party/party.service';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'ons-site-search-container',
    template: `
        <ons-site-search
            [showSearch]="isAuthenticated"
            [showMatchIndicator]="reportingUnitFound"
            [searchEnabled]="searchEnabled"
            [siteSearchUrl]="siteSearchUrl"
            (searchValueChange)="createSiteSearchFormUrl($event)"
            (searchClick_handler)="searchClick_handler($event)"></ons-site-search>
    `,
})
export class SiteSearchContainerComponent implements OnInit, OnDestroy {

    public responseOperationsUrl: string;
    public siteSearchUrl = '';
    public searchEnabled = false;
    public reportingUnitFound = false;
    public isAuthenticated: Boolean;

    private partyServiceGetBusinessByRefSubscription: Subscription;

    public searchIgnoreKeys: Array<string> = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Enter'
    ];

    constructor (
        private router: Router,
        private authenticationService: AuthenticationService,
        private partyService: PartyService) {}

    ngOnInit() {
        this.responseOperationsUrl = environment.endpoints.responseOperationsApplication;

        this.router.events
            .subscribe(
                (val: any) => {
                    this.isAuthenticated = this.authenticationService.isAuthenticated();
                },
                (err: any) => console.log('Router error: ', err)
            );
    }

    ngOnDestroy() {
        this.partyServiceGetBusinessByRefSubscription && this.partyServiceGetBusinessByRefSubscription.unsubscribe();
    }

    createSiteSearchFormUrl(event: any) {
        const val: string = event.target.value;

        if (this.searchIgnoreKeys.find((item: string) => event.key === item)) {
            return false;
        }

        this.reportingUnitFound = false;
        this.searchEnabled = val.length !== 0;

        if (val.length === 11) {
            this.searchReportingUnit(val);
        } else {
            this.cancelSearchReportingUnit();
        }

        this.siteSearchUrl = this.responseOperationsUrl + 'sampleunitref/' + event.target.value + '/cases';
    }

    searchClick_handler(eventContainer: any) {

        if (!this.searchEnabled) {
            eventContainer.$event.preventDefault();
            eventContainer.siteSearchEl.focus();
            return false;
        }
    }

    searchReportingUnit(reference: string) {

        this.partyServiceGetBusinessByRefSubscription = this.partyService.getBusinessByRef(reference)
            .subscribe(
                () => {
                    this.reportingUnitFound = true;
                },
                () => console.log('Business not found')
            );
    }

    cancelSearchReportingUnit() {
        this.partyServiceGetBusinessByRefSubscription && this.partyServiceGetBusinessByRefSubscription.unsubscribe();
    }
}
