import {Component} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { environment } from '../environments/environment';

import { AuthenticationService } from './authentication/authentication.service';
import { PartyService} from './party/party.service';
import { Business } from './party/party.model';

import { OnInit } from '@angular/core';
import { NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'ons-backstage-ui',
    moduleId: module.id, // For aot compiler relative paths

    // styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    public path = '';
    public responseOperationsUrl: string;
    public isAuthenticated: Boolean;
    public siteSearchUrl = '';
    public searchEnabled = false;
    public reportingUnitFound = false;

    public searchIgnoreKeys: Array<string> = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Enter'
    ];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private partyService: PartyService,
        private titleService: Title) {}

    ngOnInit() {

        this.responseOperationsUrl = environment.endpoints.responseOperationsApplication;

        this.router.events
            .subscribe(
                (val: any) => {
                    this.path = val.url;
                    this.isAuthenticated = this.authenticationService.isAuthenticated();
                },
                (err: any) => console.log('Router error: ', err)
            );

        /**
         * Page title updates from route
         */
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter((route) => route.outlet === 'primary')
            .mergeMap((route) => route.data)
            .subscribe((event) => this.titleService.setTitle(event['title']));
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
