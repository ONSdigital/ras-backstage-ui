import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SecureMessagesModule } from '../secure-messages.module';
import { SecureMessagesListComponent } from './secure-messages-list.component';

let fixture: any,
    comp: any;

describe('SecureMessagesListComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                SecureMessagesModule
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SecureMessagesListComponent);
        comp = fixture.debugElement.componentInstance;

        comp.secureMessages = [];
    });

    describe('extractMsgTo [method]', () => {

        let dataArr: any;

        describe('when data is falsy', () => {

            beforeEach(() => {
                dataArr = undefined;
            });

            it('should return empty object', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.extractMsgTo(dataArr)).toEqual({});
                });
            }));
        });

        describe('when data array is empty', () => {

            beforeEach(() => {
                dataArr = [];
            });

            it('should return empty object', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.extractMsgTo(dataArr)).toEqual({});
                });
            }));
        });

        describe('when data array is empty', () => {

            const testUser = {
                id: '123',
                firstName: 'test',
                lastName: 'user'
            };

            beforeEach(() => {
                dataArr = [testUser];
            });

            it('should return correct data object', async(() => {
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    expect(comp.extractMsgTo(dataArr)).toEqual(testUser);
                });
            }));
        });
    });
});
