import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { SecureMessageCreateContainerComponent } from './secure-message-create.container';

let fixture: ComponentFixture<any>,
    instance: any,

    mockSecureMessage: any,
    mockSecureMessagesActions: any;

describe('SecureMessageCreateContainerComponent', () => {

    beforeEach(async(() => {

        mockSecureMessagesActions = {
            createSecureMessage: function() {
                return Observable.of(mockSecureMessage);
            }
        };

        spyOn(mockSecureMessagesActions, 'createSecureMessage');

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SecureMessagesModule
            ],
            providers: [
                { provide: SecureMessagesActions, useValue: mockSecureMessagesActions }
            ]
        })
        .compileComponents();
    }));

    it('should initialise correctly', async(() => {
        fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
        instance = fixture.componentInstance;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
        });

        const comp = fixture.debugElement.componentInstance;
        expect(comp).toBeTruthy();
        expect(comp.subject).toEqual('');
        expect(comp.body).toEqual('');
    }));

    describe('when the sendSecureMessage_handler is invoked', () => {

        describe('and message properties are valid', () => {

            it('should call createSecureMessage action method from the SecureMessageActions service.', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });

                const comp = fixture.debugElement.componentInstance;
                comp.subject = 'Test subject';
                comp.body = 'Test body';

                comp.sendSecureMessage_handler();

                expect(mockSecureMessagesActions.createSecureMessage).toHaveBeenCalled();
            }));
        });

        describe('and message properties are invalid', () => {

            it('should not call createSecureMessage action method from the SecureMessageActions service.', async(() => {
                fixture = TestBed.createComponent(SecureMessageCreateContainerComponent);
                instance = fixture.componentInstance;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                });

                const comp = fixture.debugElement.componentInstance;
                comp.sendSecureMessage_handler();

                expect(mockSecureMessagesActions.createSecureMessage).not.toHaveBeenCalled();
            }));
        });
    });
});
