import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';

import { ROUTE_DATA_BREADCRUMB } from '../app/shared/breadcrumb/breadcrumb-item.model';
import { createURLSegment } from './UrlSegment_stub';
import { MockActivatedRoute } from './ActivatedRouteSnapshot_stub';

export function createActivatedRoute (
    path: string,
    breadcrumbLabel: any,
    children: ActivatedRoute[] = []): ActivatedRoute {

    const urlSegment = [];

    if (path !== '') {
        urlSegment.push(createURLSegment(path, breadcrumbLabel.length ? breadcrumbLabel : breadcrumbLabel()));
    }

    const mockActivatedRoute = new MockActivatedRoute();
    mockActivatedRoute.url = urlSegment;
    mockActivatedRoute.data = {
        [ROUTE_DATA_BREADCRUMB]: breadcrumbLabel
    };

    return {
        snapshot: mockActivatedRoute,
        url: Observable.of(urlSegment),
        params: Observable.of({}),
        queryParams: Observable.of({}),
        fragment: Observable.of(''),
        data: Observable.of({}),
        outlet: PRIMARY_OUTLET,
        component: null,

        routeConfig() {},
        root: null,
        parent: null,
        firstChild: null,
        children: children,
        pathFromRoot: [null],
        // paramMap() {},
        // queryParamMap() {},
        toString() {
            return '';
        }
    };
}
