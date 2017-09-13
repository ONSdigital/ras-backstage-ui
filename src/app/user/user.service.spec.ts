import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from './shared/user.model';

describe('SecureMessagesService', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                UserService
            ]
        });
    });

    describe('getUser [method]', () => {

        it('should return an observable wrapping a user',
            inject([UserService],
                (userService: UserService) => {
                    userService.getUser().subscribe((user: User) => {
                        expect(user).toEqual({
                            id: 'BRES',
                            emailAddress: 'backstage@ons.gov.uk',
                            firstName: 'BRES',
                            lastName: '',
                            telephone: '+44 1234 567890',
                            status: 'ACTIVE'
                        });
                    });
                }));
    });
});
