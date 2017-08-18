import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id, // For aot compiler relative paths

    selector: 'ons-server-error',
    templateUrl: 'server-error.component.html'
})
export class ServerErrorComponent {

    @Input() errorResponseCode: string;
    @Input() errorHeading: string;
    @Input() errorBody: string;
}
