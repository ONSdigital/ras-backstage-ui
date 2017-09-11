import { Observable } from 'rxjs/Observable';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, PRIMARY_OUTLET, UrlSegment } from '@angular/router';

import { ROUTE_DATA_BREADCRUMB } from './breadcrumb-item.model';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbContainerComponent } from './breadcrumb.container';

import { MockActivatedRoute } from '../../../testing/ActivatedRouteSnapshot_stub';

let fixture: ComponentFixture<any>,
    mockRoute: any,
    mockRouter: any;

function createURLSegment (path: string, label: string): UrlSegment {
    return new UrlSegment(path, { name: label});
}

function ActivatedRouteStub () {

}

/*function createDefaultRoute (): ActivatedRoute {
    return {
        snapshot: new MockActivatedRoute(),
        url: Observable.of([
            createURLSegment('', 'Home')
        ]),
        params: Observable.of({}),
        queryParams: Observable.of({}),
        fragment: Observable.of(''),
        data: Observable.of({}),
        outlet: PRIMARY_OUTLET,
        component: null,

        routeConfig() {},
        root() {},
        parent(): ActivatedRoute|nullxw
        firstChild(): ActivatedRoute|null
        children(): ActivatedRoute[]
        pathFromRoot(): ActivatedRoute[]
        paramMap(): Observable<ParamMap>
        queryParamMap(): Observable<ParamMap>
        toString(): string
    };

    /!*return {
        url: Observable.of([
            {
                path: 'somewhere-nice'
            }
        ])/!*,
        children: {
            outlet: PRIMARY_OUTLET,
            snapshot: {
                url: [
                    {
                        path: 'somewhere-nice'
                    }
                ],
                data: {}
            }
        }*!/
    };*!/
}*/

const activatedRoutePointer = {
    root: {}
};

describe('BreadcrumbContainerComponent', () => {

    beforeEach(() => {

        mockRoute = {

        };

        mockRouter = {
            events: {
                filter: Observable.of({})
            }
        };

        spyOn(mockRouter.events.filter, 'subscribe').and.callThrough();

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                { provide: Router, useValue: mockRouter},
                {
                    provide: ActivatedRoute,
                    useValue: activatedRoutePointer
                }
            ],
            declarations: [
                BreadcrumbComponent,
                BreadcrumbContainerComponent
            ]
        })
        .compileComponents();
    });

    it('should initialise correctly', async(() => {
        fixture = TestBed.createComponent(BreadcrumbContainerComponent);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const comp = fixture.debugElement.componentInstance;

            activatedRoutePointer.root = {};

            spyOn(comp, 'breadcrumbItems');

            expect(mockRouter.events.filter.subscribe).toHaveBeenCalled();
            expect(comp.breadcrumbItems).toHaveBeenCalledWith(activatedRoutePointer.root);
        });
    }));

    describe('breadcrumbItems [method]', () => {

        describe('when no children exist on route', () => {

            it('should return empty breadcrumb array', () => {
                fixture = TestBed.createComponent(BreadcrumbContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;

                    const result = comp.breadcrumbItems({});

                    expect(result).toEqual([]);
                });
            });
        });

        describe('when child routes exist on route', () => {

            it('should return an array of BreadcrumbItem objects', () => {
                fixture = TestBed.createComponent(BreadcrumbContainerComponent);

                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();

                    const comp = fixture.debugElement.componentInstance;
                    const mockExportedData = {
                        [ROUTE_DATA_BREADCRUMB]: 'Somewhere Nice'
                    };

                    const result = comp.breadcrumbItems({
                        children: {
                            outlet: PRIMARY_OUTLET,
                            snapshot: {
                                url: [
                                    {
                                        path: 'somewhere-nice'
                                    }
                                ],
                                data: mockExportedData
                            }
                        }
                    });

                    expect(result).toEqual([{
                        label: mockExportedData[ROUTE_DATA_BREADCRUMB],
                        params: {},
                        link: '/somewhere-nice'
                    }]);
                });
            });
        });
    });
});
