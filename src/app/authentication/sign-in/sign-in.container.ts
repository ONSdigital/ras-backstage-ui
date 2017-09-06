import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationActions } from '../authentication.actions';

@Component({
    template: `
        <ons-sign-in
            [(email)]="email"
            [(password)]="password"
            [signInNotification]="signInNotification"
            (primary_button_click)="signInClick_handler($event)"
            [primary_button_enabled]="fieldsAreValid()"></ons-sign-in>
    `,
})
export class SignInContainerComponent {

    public email = '';
    public password = '';
    public signInNotification = '';

    constructor(
        private authenticationActions: AuthenticationActions) {}

    public signInClick_handler() {

        this.signInNotification = '';

        if (!this.fieldsAreValid()) {
            return;
        }

        this.authenticationActions.authenticateCredentials(this.email, this.password)
            .subscribe(
                () => {},
                () => {
                    console.log('invalid');
                    this.signInNotification = 'Invalid username or password';
                }
            );
    }

    public fieldsAreValid() {
        return this.email && this.password;
    }
}
