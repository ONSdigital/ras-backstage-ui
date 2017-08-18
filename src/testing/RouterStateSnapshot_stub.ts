import { Observable } from 'rxjs/Observable';
import { Type } from '@angular/core';
import {
    ActivatedRoute,
    Route,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    UrlSegment,
    Params,
    Data
} from '@angular/router';

export class MockRouterStateSnapshot implements RouterStateSnapshot {
    snapshot: ActivatedRouteSnapshot;
    url: string;
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
