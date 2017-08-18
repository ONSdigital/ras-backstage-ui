import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignInContainerComponent } from './sign-in/sign-in.container';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationActions } from './authentication.actions';
import { AuthenticationService } from './authentication.service';
import { CanActivateAuthentication } from './shared/authentication-route-guard.resolver';

@NgModule({
    imports: [
        HttpModule,
        FormsModule,

        AuthenticationRoutingModule
    ],
    declarations: [
        SignInComponent,
        SignInContainerComponent
    ],
    providers: [
        AuthenticationService,
        AuthenticationActions,
        CanActivateAuthentication
    ]
})
export class AuthenticationModule {}
