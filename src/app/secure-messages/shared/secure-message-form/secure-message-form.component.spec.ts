import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureMessagesModule } from '../../secure-messages.module';
import { SecureMessageFormComponent } from './secure-message-form.component';

import { createSecureMessage_server } from '../../../../testing/create_SecureMessage';

let fixture: ComponentFixture<any>;

describe('SecureMessageFormComponent', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SecureMessagesModule
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SecureMessageFormComponent);
    });

    describe('isValid [method]', () => {

        let comp: any;

        beforeEach(() => {
            comp = fixture.debugElement.componentInstance;
        });

        describe('when form is valid', () => {

            it('should return true', async(() => {

                const secureMessage = createSecureMessage_server('100');

                secureMessage.thread_id = '123';
                secureMessage.msg_id = '123';
                secureMessage.subject = 'Test subject';
                secureMessage.body = 'Test body';

                comp.subject = secureMessage.subject;
                comp.body = secureMessage.body;
                comp.message = secureMessage;

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.isValid()).toEqual(true);
                });
            }));
        });


        /*describe('when form is not valid', () => {

            it('should return false', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    comp.subject = '';
                    comp.body = 'Test body';

                    expect(comp.isValid()).toEqual(false);
                });
            }));
        });*/
    });
});
