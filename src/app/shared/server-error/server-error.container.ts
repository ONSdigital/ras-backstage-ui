import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    template: `
        <ons-server-error
            [errorResponseCode]="errorResponseCode"
            [errorHeading]="errorHeading"
            [errorBody]="errorBody"></ons-server-error>
    `,
})
export class ServerErrorContainerComponent implements OnInit {

    public errorResponseCode = '';
    public errorHeading = '';
    public errorBody = '';

    constructor(
        private route: ActivatedRoute) {}

    ngOnInit() {

        this.route.queryParams
            .subscribe(
                (params: any) => {
                    this.errorResponseCode = params.errorResponseCode || '';
                    this.errorHeading = params.errorHeading || '';
                    this.errorBody = params.errorBody || '';
                },
                (err: any) => console.log('Error: ', err)
            );
    }
}
