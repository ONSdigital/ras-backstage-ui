import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureMessagesModule } from '../../../secure-messages.module';
import { SecureMessageConversationMessageComponent } from './secure-message-conversation-message.component';

let fixture: any,
    comp: any;

describe('SecureMessageConversationMessageComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SecureMessagesModule
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SecureMessageConversationMessageComponent);
        comp = fixture.debugElement.componentInstance;
    });

    describe('personLabel [method]', () => {

        let personData: any;

        beforeEach(() => {
            comp.newSecureMessageModel = {};
        });

        describe('when personData has the correct properties', () => {

            beforeEach(() => {
                personData = {
                    firstName: 'My first name',
                    lastName: 'My last name'
                };
            });

            it('should return the correctly formatted person label', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.personLabel(personData)).toEqual(personData.firstName + ' ' +
                        personData.lastName);
                });
            }));
        });

        describe('when personData does not have the correct properties', () => {

            beforeEach(() => {
                personData = {
                    nope: 'invalid data'
                };
            });

            it('should return not found notice', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.personLabel(personData)).toEqual('(Name not found)');
                });
            }));
        });
    });
});
