import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationActions } from '../authentication.actions';

@Component({
    template: `
        <ons-sign-in
            [(email)]="email"
            [(password)]="password"
            (primary_button_click)="signInClick_handler($event)"
            [primary_button_enabled]="fieldsAreValid()"></ons-sign-in>
    `,
})
export class SignInContainerComponent {

    public email = '';
    public password = '';

    constructor(
        private authenticationActions: AuthenticationActions) {}

    public signInClick_handler() {

        if (!this.fieldsAreValid()) {
            return;
        }

        this.authenticationActions.authenticateCredentials(this.email, this.password);
    }

    public fieldsAreValid() {
        return this.email && this.password;
    }
}
