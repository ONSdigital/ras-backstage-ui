import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesActions } from '../secure-messages.actions';
import { DraftMessageEditContainerComponent } from './draft-message-edit.container';

let fixture: ComponentFixture<any>,
    instance: any,

    mockSecureMessagesActions: any;

describe('DraftMessageContainerComponent', () => {

    beforeEach(() => {

        mockSecureMessagesActions = {
            createSecureMessage: function() {
                return Observable.of({/*Server status object*/});
            },
            updateDraft: function() {
                return Observable.of({/*Server status object*/});
            }
        };

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
    });

    it('should initialise correctly', async(() => {
        fixture = TestBed.createComponent(DraftMessageEditContainerComponent);
        instance = fixture.componentInstance;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const comp = fixture.debugElement.componentInstance;
            expect(comp).toBeTruthy();
            expect(comp.draftMessage).toEqual(undefined);
            // expect(comp.to).toEqual('');
            expect(comp.subject).toEqual('');
            expect(comp.body).toEqual('');
        });
    }));
});
