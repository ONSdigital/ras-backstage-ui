import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";

import { BreadcrumbItem, ROUTE_DATA_BREADCRUMB } from '../../shared/breadcrumb/breadcrumb-item.model';

import { isFunction } from '../../shared/utils';

@Component({
    selector: 'ons-breadcrumb-container',
    template: `
        <ons-breadcrumb [trail]="breadCrumbTrail"></ons-breadcrumb>
    `,
})
export class BreadcrumbContainer {

    private breadCrumbTrail:Array<BreadcrumbItem> = [];

    constructor(
        private route:ActivatedRoute,
        private router:Router) {}

    ngOnInit() {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            let root: ActivatedRoute = this.route.root;

            console.log(root);

            this.breadCrumbTrail = this.breadcrumbItems(root);

            console.log(this.breadCrumbTrail);
        });
    }

    private breadcrumbItems(
        route:ActivatedRoute,
        url:String = "",
        breadcrumbItems:Array<BreadcrumbItem> = []):Array<BreadcrumbItem> {

        let children:Array<ActivatedRoute> = route.children;

        if(!children.length) {
            return breadcrumbItems;
        }

        for(let child of children) {

            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB) ||
                child.snapshot.data[ROUTE_DATA_BREADCRUMB] === null) {

                return this.breadcrumbItems(child, url, breadcrumbItems);
            }

            console.log(2);

            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            url += `/${routeURL}`;

            console.log(url);

            let dataLabel = child.snapshot.data[ROUTE_DATA_BREADCRUMB];

            let breadcrumbItem:BreadcrumbItem = {
                label: isFunction(dataLabel) ? dataLabel(child.snapshot.data) : dataLabel,
                params: child.snapshot.params,
                link: url
            };

            breadcrumbItems.push(breadcrumbItem);

            console.log(3);

            return this.breadcrumbItems(child, url, breadcrumbItems);
        }
    }

}
