import { Observable } from 'rxjs/Observable';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserModule } from './user.module';
import { UserResolver } from './user.resolver';
import { UserActions } from './user.actions';

import { MockActivatedRoute } from '../../testing/ActivatedRouteSnapshot_stub';

let mockUserActions: any;

describe('UserResolver', () => {

    beforeEach(() => {

        mockUserActions = {
            getUser() {}
        };

        spyOn(mockUserActions, 'getUser');

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                UserModule
            ],
            providers: [
                { provide: UserActions, useValue: mockUserActions }
            ]
        })
        .compileComponents();
    });

    describe('resolve [method]', () => {

        it('should call UserActions getUser method to get a user',
            inject([UserResolver],
                (secureMessageCreateResolver: UserResolver) => {

                    const activatedRouteSnapShot = new MockActivatedRoute();

                    secureMessageCreateResolver.resolve(activatedRouteSnapShot);

                    expect(mockUserActions.getUser).toHaveBeenCalled();
                }));
    });
});
