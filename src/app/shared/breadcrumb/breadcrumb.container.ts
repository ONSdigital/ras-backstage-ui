import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';

import { BreadcrumbItem, ROUTE_DATA_BREADCRUMB } from '../../shared/breadcrumb/breadcrumb-item.model';

import { isFunction } from '../../shared/utils';

@Component({
    selector: 'ons-breadcrumb-container',
    template: `
        <ons-breadcrumb [trail]="breadcrumbTrail"></ons-breadcrumb>
    `,
})
export class BreadcrumbContainerComponent implements OnInit {

    public breadcrumbTrail: Array<BreadcrumbItem> = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.router.events.filter(event => event instanceof NavigationEnd)
            .subscribe(
                event => {
                    const root: ActivatedRoute = this.route.root;
                    this.breadcrumbTrail = this.breadcrumbItems(root);
                },
                (err: any) => console.log('Error: ', err)
            );
    }

    public breadcrumbItems(
        route: ActivatedRoute,
        url: String = '',
        breadcrumbItems: Array<BreadcrumbItem> = []): Array<BreadcrumbItem> {

        const children: Array<ActivatedRoute> = route.children;

        if (!children.length) {
            return breadcrumbItems;
        }

        for (const child of children) {

            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB) ||
                child.snapshot.data[ROUTE_DATA_BREADCRUMB] === null) {

                return this.breadcrumbItems(child, url, breadcrumbItems);
            }

            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            url += `/${routeURL}`;

            const dataLabel = child.snapshot.data[ROUTE_DATA_BREADCRUMB];

            const breadcrumbItem: BreadcrumbItem = {
                label: isFunction(dataLabel) ? dataLabel(child.snapshot.data) : dataLabel,
                params: child.snapshot.params,
                link: url
            };

            breadcrumbItems.push(breadcrumbItem);

            return this.breadcrumbItems(child, url, breadcrumbItems);
        }
    }

}
