import { Observable } from 'rxjs/Rx';
import { Router, NavigationEnd } from '@angular/router';

import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { HomeComponent } from './shared/home/home.component';
import { SecureMessagesComponent } from './secure-messages/secure-messages.component';

import { PartyService } from './party/party.service';
import { AuthenticationService } from './authentication/authentication.service';

import { environment } from '../environments/environment';

let fixture: ComponentFixture<any>,
    instance: Component,
    page: Page,

    mockPartyService: any,
    mockAuthenticationService: any;

const responseOperationsUrl = environment.endpoints.responseOperationsApplication;

class Page {

    titleBar: HTMLElement;

    addPageElements() {
        this.titleBar = fixture.debugElement.nativeElement.querySelector('.bar__title');
    }
}

function createComponent(component: any) {

    fixture = TestBed.createComponent(component);
    instance = fixture.componentInstance;
    page = new Page();

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
        page.addPageElements();
    });
}

describe('AppComponent', () => {

    beforeEach(() => {

        mockAuthenticationService = {
            isAuthenticated () {
                return true;
            }
        };

        mockPartyService = {
            getBusinessByRef () {
                return Observable.of({});
            }
        };

        spyOn(mockAuthenticationService, 'isAuthenticated').and.callThrough();
        spyOn(mockPartyService, 'getBusinessByRef').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                AppModule,
                RouterTestingModule.withRoutes([
                    { path: '', component: HomeComponent },
                    { path: 'secure-messages', component: SecureMessagesComponent }
                ])
            ],
            providers: [
                { provide: AuthenticationService, useValue: mockAuthenticationService },
                { provide: PartyService, useValue: mockPartyService }
            ],
            declarations: [
            ]
        })
        .compileComponents();
    });

    it('should create the app', async(() => {
        fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const comp = fixture.debugElement.componentInstance;
            expect(comp).toBeTruthy();
        });
    }));

    it('should initialise correctly',
        inject([Router], (router: Router) => {
        fixture = TestBed.createComponent(AppComponent);

        router.navigate(['123']);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const comp = fixture.debugElement.componentInstance;

            expect(mockAuthenticationService.isAuthenticated).toHaveBeenCalled();

            expect(comp.path).toEqual('/123');
            expect(comp.isAuthenticated).toEqual(true);
        });
    }));

    it('should render service title in sub heading', async(() => {
        fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('.bar__title').textContent).toContain('Response Operations');
        });
    }));

    describe('createSiteSearchFormUrl [method]', () => {

        describe('when supplied a keypad event that is not in the ignore list', () => {

            const evt: any = {
                key: 'A'
            };

            describe('and search string length is within character limit', () => {

                evt.target = {
                    value: 'Input'
                };

                it('should correctly assign the siteSearchUrl property', () => {
                    fixture = TestBed.createComponent(AppComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        comp.createSiteSearchFormUrl(evt);

                        expect(comp.siteSearchUrl)
                            .toEqual(responseOperationsUrl +
                                'sampleunitref/' + evt.target.value + '/cases');
                    });
                });

                it('should not call searchReportingUnit', () => {
                    fixture = TestBed.createComponent(AppComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        comp.createSiteSearchFormUrl(evt);

                        spyOn(comp, 'searchReportingUnit').and.callThrough();

                        expect(comp.searchReportingUnit).not.toHaveBeenCalled();
                    });
                });
            });

            describe('and search string has reached character limit', () => {

                evt.target = {
                    value: 'Valid input'
                };

                it('should call searchReportingUnit', () => {
                    fixture = TestBed.createComponent(AppComponent);

                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                        fixture.detectChanges();

                        const comp = fixture.debugElement.componentInstance;

                        spyOn(comp, 'searchReportingUnit').and.callThrough();

                        comp.createSiteSearchFormUrl(evt);

                        expect(comp.searchReportingUnit).toHaveBeenCalled();
                    });
                });
            });
        });

        describe('when supplied a keypad event that is in the ignore list', () => {

            const evt: any = {
                key: 'ArrowLeft'
            };

            it('should return false', () => {
                fixture = TestBed.createComponent(AppComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    const result = comp.createSiteSearchFormUrl(evt);

                    expect(result).toEqual(false);
                });
            });
        });
    });

    describe('searchClick_handler', () => {

        let standardEvent = {
            preventDefault() {}
        };

        describe('when search is disabled', () => {

            it('should focus the siteSearchEl', () => {
                fixture = TestBed.createComponent(AppComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    const siteSearchEl = {
                        focus() {}
                    };

                    comp.searchEnabled = false;

                    spyOn(standardEvent, 'preventDefault');
                    spyOn(siteSearchEl, 'focus');

                    const result = comp.searchClick_handler(standardEvent, siteSearchEl);

                    expect(standardEvent.preventDefault).toHaveBeenCalled();
                    expect(siteSearchEl.focus).toHaveBeenCalled();
                    expect(result).toEqual(false);
                });
            });
        });

        describe('when search is enabled', () => {

            it('should return undefined', () => {
                fixture = TestBed.createComponent(AppComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    const siteSearchEl = {
                        focus() {}
                    };

                    comp.searchEnabled = true;

                    spyOn(standardEvent, 'preventDefault');
                    spyOn(siteSearchEl, 'focus');

                    const result = comp.searchClick_handler(standardEvent, siteSearchEl);

                    expect(standardEvent.preventDefault).not.toHaveBeenCalled();
                    expect(siteSearchEl.focus).not.toHaveBeenCalled();
                    expect(result).toEqual(undefined);
                });
            })
        });
    });

    describe('searchReportingUnit', () => {

        it('should call the getBusinessByRef method on the party service', () => {
            fixture = TestBed.createComponent(AppComponent);

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                fixture.detectChanges();

                const comp = fixture.debugElement.componentInstance;
                comp.searchReportingUnit('234');

                expect(mockPartyService.getBusinessByRef).toHaveBeenCalledWith('234');
                expect(comp.reportingUnitFound).toEqual(true);
            });
        });
    });
});
