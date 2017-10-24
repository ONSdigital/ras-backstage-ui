import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessageViewComponent } from './secure-message-view.component';

let fixture: any,
    comp: any;

describe('SecureMessageViewComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SecureMessagesModule
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SecureMessageViewComponent);
        comp = fixture.debugElement.componentInstance;
    });

    describe('isValid [method]', () => {

        describe('when new message model is valid', () => {

            beforeEach(() => {
                comp.newSecureMessageModel = {
                    subject: 'New message subject',
                    body: 'New message body'
                };
            });

            it('should return true', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.isValid()).toEqual(true);
                });
            }));
        });

        describe('when new message model has no subject', () => {

            beforeEach(() => {
                comp.newSecureMessageModel = {
                    body: 'New message body'
                };
            });

            it('should return false', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.isValid()).toEqual(false);
                });
            }));
        });

        describe('when new message model is undefined', () => {

            beforeEach(() => {
                comp.newSecureMessageModel = undefined;
            });

            it('should return false', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.isValid()).toEqual(false);
                });
            }));
        });
    });

    describe('onTypingReply [method]', () => {

        describe('when passed a valid newSecureMessageModel input', () => {

            beforeEach(() => {
                comp.newSecureMessageModel = {};
            });

            it('should correctly assign the newSecureMessageModel body property', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const bodyText = 'Example body text';

                    comp.onTypingReply(bodyText);

                    expect(comp.newSecureMessageModel.body).toEqual(bodyText);
                });
            }));
        });

        describe('when not passed a valid newSecureMessageModel input', () => {

            beforeEach(() => {
                comp.newSecureMessageModel = undefined;
            });

            it('should return undefined', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    comp.onTypingReply('Example body text');

                    expect(comp.newSecureMessageModel).toEqual(undefined);
                });
            }));
        });
    });
});
