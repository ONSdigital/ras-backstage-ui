import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    template: `
        <ons-server-error
            [errorHeading]="errorHeading"
            [errorBody]="errorBody"></ons-server-error>
    `,
})
export class ServerErrorContainerComponent implements OnInit {

    public errorHeading = '';
    public errorBody = '';

    constructor(
        private route: ActivatedRoute) {}

    ngOnInit() {

        this.route.queryParams
            .subscribe((params: any) => {
                this.errorHeading = params.errorHeading || '';
                this.errorBody = params.errorBody || '';
            });
    }
}
