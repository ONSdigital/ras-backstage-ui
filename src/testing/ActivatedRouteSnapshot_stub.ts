import { Observable } from 'rxjs/Observable';
import { Type } from '@angular/core';
import {
    ActivatedRoute,
    Route,
    ActivatedRouteSnapshot,
    UrlSegment,
    Params,
    Data
} from '@angular/router';

export class MockActivatedRoute implements ActivatedRouteSnapshot {
    snapshot: ActivatedRouteSnapshot;
    url: UrlSegment[];
    params: Observable<Params>;
    queryParams: Observable<Params>;
    fragment: string;
    data: Observable<Data>;
    outlet: string;
    component: Type<any>|string;
    routeConfig: Route;
    root: ActivatedRouteSnapshot;
    parent: ActivatedRouteSnapshot;
    firstChild: ActivatedRouteSnapshot;
    children: ActivatedRouteSnapshot[];
    pathFromRoot: ActivatedRouteSnapshot[];
    toString(): string {
        return '';
    };
}
