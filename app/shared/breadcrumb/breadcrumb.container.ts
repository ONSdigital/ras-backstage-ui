import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";

import { BreadcrumbItem, ROUTE_DATA_BREADCRUMB } from '../../shared/breadcrumb/breadcrumb-item.model';

@Component({
    selector: 'ons-breadcrumb-container',
    template: `
        <ons-breadcrumb [trail]="breadCrumbTrail"></ons-breadcrumb>
    `,
})
export class BreadcrumbContainer {

    private breadCrumbTrail:Array<BreadcrumbItem> = [];
    private url:String;

    constructor(
        private route:ActivatedRoute,
        private router:Router) {}

    ngOnInit() {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            let root: ActivatedRoute = this.route.root;
            this.breadCrumbTrail = this.breadcrumbItems(root);
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

        for (let child of children) {
            console.log(child);

            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.breadcrumbItems(child, this.url, breadcrumbItems);
            }

            console.log(2);

            let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

            this.url += `/${routeURL}`;

            let breadcrumbItem:BreadcrumbItem = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                params: child.snapshot.params,
                link: this.url
            };

            breadcrumbItems.push(breadcrumbItem);

            console.log(3);

            return this.breadcrumbItems(child, this.url, breadcrumbItems);
        }
    }

}
