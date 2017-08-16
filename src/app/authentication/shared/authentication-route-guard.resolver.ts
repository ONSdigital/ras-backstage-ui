import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class CanActivateAuthentication implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any>|boolean {

        if (this.authenticationService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/sign-in']);
            return false;
        }
    }
}
