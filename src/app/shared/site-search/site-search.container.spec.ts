import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PartyService } from '../../party/party.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { SiteSearchContainerComponent } from './site-search.container';
import { SiteSearchComponent } from './site-search.component';

import { environment } from '../../../environments/environment';

let fixture: ComponentFixture<any>,
    comp: any,

    mockPartyService: any,
    mockAuthenticationService: any,
    mockAuthenticationIndicator: Boolean,
    mockBusiness_observable: any;

const responseOperationsUrl = environment.endpoints.responseOperationsApplication,
    originalConsoleLog = console.log;

function whenStable (then: Function) {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        fixture.detectChanges();
        then();
    });
}

describe('SiteSearchContainerComponent', () => {

    beforeEach(() => {

        spyOn(console, 'log').and.callThrough();

        mockAuthenticationIndicator = false;

        mockAuthenticationService = {
            isAuthenticated () {
                return mockAuthenticationIndicator;
            }
        };

        mockBusiness_observable = Observable.of({});

        mockPartyService = {
            getBusinessByRef () {
                return mockBusiness_observable;
            }
        };

        spyOn(mockAuthenticationService, 'isAuthenticated').and.callThrough();
        spyOn(mockPartyService, 'getBusinessByRef').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                { provide: AuthenticationService, useValue: mockAuthenticationService },
                { provide: PartyService, useValue: mockPartyService }
            ],
            declarations: [
                SiteSearchComponent,
                SiteSearchContainerComponent
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SiteSearchContainerComponent);
        comp = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
        console.log = originalConsoleLog;
    });

    describe('ngOnInit', () => {

        describe('when router events successfully publishes an event', () => {

            it('should correctly assign isAuthenticated local property', async(() => {
                mockAuthenticationIndicator = true;

                whenStable(() => {
                    comp.router.events.next('123');

                    expect(mockAuthenticationService.isAuthenticated).toHaveBeenCalled();
                    expect(comp.isAuthenticated).toEqual(true);
                });
            }));
        });

        describe('when router events fails to publish an event', () => {

            const routerEventError = 'Router events error';

            it('should log error to console', async(() => {

                comp.router = {
                    events: Observable.throw('Router events error')
                };

                whenStable(() => {
                    expect(mockAuthenticationService.isAuthenticated).not.toHaveBeenCalled();
                    expect(console.log).toHaveBeenCalledWith('Router error: ', routerEventError);
                });
            }));
        });
    });

    describe('createSiteSearchFormUrl [method]', () => {

        describe('when supplied a keypad event that is not in the ignore list', () => {

            let evt: any;

            beforeEach(() => {
                evt = {
                    key: 'A'
                };
            });

            describe('and search string length is within character limit', () => {

                beforeEach(() => {
                    evt.target = {
                        value: 'Input'
                    };
                });

                it('should correctly assign the siteSearchUrl property', async(() => {
                    whenStable(() => {
                        comp.createSiteSearchFormUrl(evt);

                        expect(comp.siteSearchUrl)
                            .toEqual(responseOperationsUrl +
                                'sampleunitref/' + evt.target.value + '/cases');
                    });
                }));

                it('should not call searchReportingUnit', async(() => {
                    whenStable(() => {
                        spyOn(comp, 'searchReportingUnit').and.callThrough();

                        comp.createSiteSearchFormUrl(evt);

                        expect(comp.searchReportingUnit).not.toHaveBeenCalled();
                    });
                }));
            });

            describe('and search string has reached character limit', () => {

                beforeEach(() => {
                    evt.target = {
                        value: 'Valid input'
                    };
                });

                it('should call searchReportingUnit', async(() => {
                    whenStable(() => {
                        spyOn(comp, 'searchReportingUnit').and.callThrough();

                        comp.createSiteSearchFormUrl(evt);

                        expect(comp.searchReportingUnit).toHaveBeenCalled();
                    });
                }));
            });
        });

        describe('when supplied a keypad event that is in the ignore list', () => {

            let evt: any;

            beforeEach(() => {
                evt = {
                    key: 'ArrowLeft',
                    target: {
                        value: 'Input'
                    }
                };
            });

            it('should return false', async(() => {
                whenStable(() => {
                    const result = comp.createSiteSearchFormUrl(evt);

                    expect(result).toEqual(false);
                });
            }));
        });
    });

    describe('searchClick_handler [method]', () => {

        let standardEvent: any;

        beforeEach(() => {
            standardEvent = {
                preventDefault() {}
            };
        });

        describe('when search is disabled', () => {

            it('should focus the siteSearchEl', async(() => {
                whenStable(() => {
                    const siteSearchEl = {
                        focus() {}
                    };

                    comp.searchEnabled = false;

                    spyOn(standardEvent, 'preventDefault');
                    spyOn(siteSearchEl, 'focus');

                    const result = comp.searchClick_handler({ $event: standardEvent, siteSearchEl: siteSearchEl });

                    expect(standardEvent.preventDefault).toHaveBeenCalled();
                    expect(siteSearchEl.focus).toHaveBeenCalled();
                    expect(result).toEqual(false);
                });
            }));
        });

        describe('when search is enabled', () => {

            it('should return undefined', async(() => {
                whenStable(() => {
                    const siteSearchEl = {
                        focus() {}
                    };

                    comp.searchEnabled = true;

                    spyOn(standardEvent, 'preventDefault');
                    spyOn(siteSearchEl, 'focus');

                    const result = comp.searchClick_handler({ $event: standardEvent, siteSearchEl: siteSearchEl });

                    expect(standardEvent.preventDefault).not.toHaveBeenCalled();
                    expect(siteSearchEl.focus).not.toHaveBeenCalled();
                    expect(result).toEqual(undefined);
                });
            }));
        });
    });

    describe('searchReportingUnit [method]', () => {

        describe('when a reporting unit is found in the party service', () => {

            it('should call the getBusinessByRef method on the party service', async(() => {
                whenStable(() => {
                    comp.searchReportingUnit('234');

                    expect(mockPartyService.getBusinessByRef).toHaveBeenCalledWith('234');
                    expect(comp.reportingUnitFound).toEqual(true);
                });
            }));
        });

        describe('when a reporting unit is not found in the party service', () => {

            beforeEach(() => {
                mockBusiness_observable = Observable.throw('Error getting business');
            });

            it('should log not found error to the console', async(() => {
                whenStable(() => {
                    comp.searchReportingUnit('234');

                    expect(mockPartyService.getBusinessByRef).toHaveBeenCalled();
                    expect(console.log).toHaveBeenCalledWith('Business not found');
                });
            }));
        });
    });
});
