import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationModule } from '../authentication.module';
import { CanActivateAuthentication } from './authentication-route-guard.resolver';
import { AuthenticationService } from '../authentication.service';

import { MockActivatedRoute } from '../../../testing/ActivatedRouteSnapshot_stub';
import { MockRouterStateSnapshot } from '../../../testing/RouterStateSnapshot_stub';

let mockAuthenticationService: any,
    isAuthenticated = true;

describe('CanActivateAuthentication guard', () => {

    beforeEach(() => {

        mockAuthenticationService = {
            isAuthenticated: function () {
                return isAuthenticated;
            }
        };

        spyOn(mockAuthenticationService, 'isAuthenticated').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                AuthenticationModule,
                RouterTestingModule
            ],
            providers: [
                { provide: AuthenticationService, useValue: mockAuthenticationService }
            ]
        })
        .compileComponents();
    });

    describe('canActivate [method]', () => {

        it('should call the isAuthenticated method on the AuthenticationService',
            inject([CanActivateAuthentication],
                (canActivateAuthenticationGuard: CanActivateAuthentication) => {

                    const activatedRouteSnapshot = new MockActivatedRoute();
                    const routerStateSnapshot = new MockRouterStateSnapshot();

                    canActivateAuthenticationGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
                    expect(mockAuthenticationService.isAuthenticated).toHaveBeenCalled();
                }));

        describe('when user is authenticated', () => {

            beforeEach(() => {
                isAuthenticated = true;
            });

            it('should return true',
                inject([CanActivateAuthentication],
                    (canActivateAuthenticationGuard: CanActivateAuthentication) => {

                        const activatedRouteSnapshot = new MockActivatedRoute();
                        const routerStateSnapshot = new MockRouterStateSnapshot();

                        const result = canActivateAuthenticationGuard.canActivate(
                            activatedRouteSnapshot,
                            routerStateSnapshot);

                        expect(result).toEqual(true);
                    }));
        });

        describe('when user is not authenticated', () => {

            beforeEach(() => {
                isAuthenticated = false;
            });

            it('should return false',
                inject([CanActivateAuthentication],
                    (canActivateAuthenticationGuard: CanActivateAuthentication) => {

                        const activatedRouteSnapshot = new MockActivatedRoute();
                        const routerStateSnapshot = new MockRouterStateSnapshot();

                        const result = canActivateAuthenticationGuard.canActivate(
                            activatedRouteSnapshot,
                            routerStateSnapshot);

                        expect(result).toEqual(false);
                    }));
        });
    });
});
