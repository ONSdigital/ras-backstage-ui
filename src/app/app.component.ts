import {Component} from '@angular/core';
import {Router} from '@angular/router';

import { OnInit } from '@angular/core';
import { NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './authentication/authentication.service';

import { environment } from '../environments/environment';

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
    public isAuthenticated: Boolean;
    public responseOperationsUrl: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authenticationService: AuthenticationService,
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
}
