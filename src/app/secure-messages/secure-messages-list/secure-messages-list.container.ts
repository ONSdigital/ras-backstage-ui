import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    template: `
        <h1 class="saturn">Secure messages</h1>
        <ul>
            <li><a routerLink="create-message">Create new message</a></li>
            <li><a routerLink="view-message">View a message</a></li>
        </ul>
        <ons-secure-messages-list
            [secureMessages]="secureMessagesList"></ons-secure-messages-list>
    `,
})
export class SecureMessagesListContainerComponent {

    public secureMessagesList: Array<any> = [{}];

}
