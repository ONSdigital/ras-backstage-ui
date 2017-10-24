import { Observable } from 'rxjs/Rx';
import {
    Response,
    ResponseOptions
} from '@angular/http';

import { AuthenticationService } from '../authentication/authentication.service';

import {
    isFunction,
    validateProperties,
    validationOutput,
    printResponse,
    handleError,
    CheckBadRequest,
    global
} from './utils';

import { createBadRequest } from '../../../testing-utils';

const originalConsole: any = console.log;
const originalWindowLocationHref = window.location.href;

const originalGlobalObj = global;

AuthenticationService.routerCache = undefined;

describe('utils', () => {

    function resetAuthentication () {
        AuthenticationService.routerCache = {
            navigate () {}
        };
    }

    beforeEach(() => {
        spyOn(console, 'log').and.callThrough();

        resetAuthentication();
        spyOn(AuthenticationService.routerCache, 'navigate');
    });

    afterEach(() => {
        console.log = originalConsole;
        resetAuthentication();
    });

    describe('isFunction [function]', () => {

        describe('when called with a function', () => {

            it('should return true',  () => {
                expect(isFunction(function () {})).toEqual(true);
            });
        });

        describe('when called with an object', () => {

            it('should return false',  () => {
                expect(isFunction({})).toEqual(false);
            });
        });

        describe('when called with a primitive', () => {

            it('should return false',  () => {
                expect(isFunction('primitive')).toEqual(false);
            });
        });
    });

    describe('validateProperties [function]', () => {

        describe('when called with invalid parameters', () => {

            it('should return undefined', () => {
                expect(validateProperties(false, null)).toEqual(undefined);
                expect(validateProperties(false, [])).toEqual(undefined);
                expect(validateProperties({}, [])).toEqual(undefined);

            });
        });

        describe('when called with valid parameters', () => {

            let param1: any;
            let param2: any;

            function resetVals () {
                param1 = {};
                param2 = [
                    {
                        propertyName: 'bananas',
                        errorMessage: 'property a'
                    },
                    {
                        propertyName: 'apples',
                        errorMessage: 'property a'
                    }
                ];
            }

            beforeEach(resetVals);
            afterEach(resetVals);

            describe('when entity object is invalid', () => {

                it('should return a list of failed validation', () => {
                    const result: Array<any> | Boolean = validateProperties(param1, param2);
                    expect(result).toBeTruthy();
                    expect((<any>result).length).toEqual(2);
                });
            });

            describe('when entity object is valid', () => {

                beforeEach(() => {
                    param1 = {
                        bananas: 'Valid banana',
                        apples: 'Granny Smith'
                    };
                });

                it('should return false indicating validation passed', () => {
                    const result: Array<any> | Boolean = validateProperties(param1, param2);

                    expect(result).toEqual(false);
                });
            });
        });
    });

    describe('validationOutput [function]', () => {

        describe('when called with a ValidationError', () => {

            it('should call console to write error notification', () => {
                const notification = 'A notification string';

                validationOutput({
                    notification: notification
                });

                expect(console.log).toHaveBeenCalledWith(notification);
            });

            describe('and called with a subject in ValidationError', () => {

                let param: any;

                function resetVals () {
                    param = {
                        notification: 'Notification 100'
                    };
                }

                beforeEach(resetVals);
                afterEach(resetVals);

                describe('and without a subject label', () => {

                    beforeEach(() => {
                        param.subject = { grapes: 'sweet' };
                    });

                    it('should write additional information without the subject label to the console', () => {
                        validationOutput(param);

                        expect(console.log).toHaveBeenCalledWith(param.notification);
                        expect(console.log).toHaveBeenCalledWith('Error subject: ', param.subject);
                    });
                });

                describe('and with a subject label', () => {

                    beforeEach(() => {
                        param.subject = { grapes: 'sweet' };
                        param.subjectLabel = 'Fruit';
                    });

                    it('should write additional information with subject label to the console', () => {
                        validationOutput(param);

                        expect(console.log).toHaveBeenCalledWith(param.subjectLabel, param.subject);
                    });
                });
            });
        });
    });

    describe('printResponse [function]', () => {

        it('should print the response to the console', () => {
            const res: any = {};

            printResponse('Some error', res);

            expect(console.log).toHaveBeenCalledWith('Some error: ', res);
        });
    });

    describe('handleError [function]', () => {

        it('should throw an observable error', () => {
            const body = 'Response body here';
            const errorResponse = new Response(
                new ResponseOptions({
                    body: JSON.stringify(body)
                }));
            const observable = handleError(errorResponse);

            let errored = false;

            observable.subscribe(
                () => {},
                () => {
                    errored = true;
                }
            );

            expect(errored).toEqual(true);
            expect(console.log).toHaveBeenCalledWith('Error response: ', errorResponse);
        });
    });

    describe('CheckBadRequest [decorator]', () => {

        function createCallDecoratorBinding (options: any, errorResponse: any) {
            const binding: any = CheckBadRequest(options);
            const method: any = function () {
                return errorResponse;
            };
            const descriptorValue = {
                value: method
            };

            /**
             * Decorate method
             */
            binding({}, '', descriptorValue);

            return descriptorValue.value;
        }

        describe('when supplied with valid option arguments', () => {

            let options: any;
            let errorResponse: any;

            beforeEach(() => {
                options = {
                    errorHeading: 'Test error heading',
                    serviceClass: 'TestClass'
                };
            });

            describe('and response status is equal to 401', () => {

                beforeEach(() => {
                    errorResponse = createBadRequest({
                        status: 401
                    });
                });

                it('should ignore unauthorized unrelated error', () => {
                    const result = createCallDecoratorBinding(options, errorResponse)();

                    result.subscribe(
                        () => {},
                        () => {
                            expect(console.log).not.toHaveBeenCalled();
                            expect(AuthenticationService.routerCache.navigate).not.toHaveBeenCalled();
                            expect(location.href).toEqual(originalWindowLocationHref);
                        }
                    );
                });
            });

            describe('and response status is not equal to 401', () => {

                const errorStatus = 500;

                beforeEach(() => {
                    errorResponse = createBadRequest({
                        status: errorStatus
                    });
                });

                it('should log server error response', () => {
                    const result = createCallDecoratorBinding(options, errorResponse)();

                    result.subscribe(
                        () => {},
                        (err: any) => {
                            expect(console.log).toHaveBeenCalledWith('Bad request: ', err);
                        }
                    );
                });

                describe('and router exists on AuthenticationService', () => {

                    beforeEach(() => {
                        AuthenticationService.routerCache = {
                            navigate: function () {}
                        };

                        spyOn(AuthenticationService.routerCache, 'navigate');
                    });

                    afterEach(() => {
                        AuthenticationService.routerCache = undefined;
                    });

                    it('should call navigate on router with correct parameters', () => {
                        const result = createCallDecoratorBinding(options, errorResponse)();

                        result.subscribe(
                            () => {},
                            (err: any) => {
                                expect(AuthenticationService.routerCache.navigate)
                                    .toHaveBeenCalledWith(['/server-error'], {
                                        queryParams: {
                                            errorResponseCode: errorStatus,
                                            errorHeading: options.errorHeading,
                                            errorBody: options.serviceClass.label + ' error: ' + err.errorMessage
                                        }
                                    });
                            }
                        );
                    });
                });

                describe('and router does not exist on AuthenticationService', () => {

                    beforeEach(() => {
                        spyOn(global, 'changeLocation');
                        AuthenticationService.routerCache = undefined;
                    });

                    afterEach(() => {
                        global.changeLocation = originalGlobalObj.changeLocation;
                    });

                    it('should call global changeLocation method', () => {
                        const result = createCallDecoratorBinding(options, errorResponse)();

                        result.subscribe(
                            () => {},
                            (err: any) => {
                                expect(global.changeLocation).toHaveBeenCalledWith('/server-error?errorResponseCode=' +
                                    errorStatus +
                                    '&errorHeading=' + options.errorHeading + '&errorBody=' +
                                    options.serviceClass.label + ' error: ' +
                                    err.errorMessage);
                            }
                        );
                    });
                });
            });
        });

        describe('when not supplied with valid option arguments', () => {

            it('should throw an invalid configuration error', () => {

                try {
                    const binding: any = CheckBadRequest({});

                    expect(binding).toThrowError('Invalid configuration of CheckBadRequest. Require errorHeading, ' +
                        'serviceClass properties');
                } catch (e) {

                } finally {

                }
            });
        });
    });

    describe('global [singleton]', () => {

        describe('changeLocation [method]', () => {

            beforeEach(() => {

                global.view = {
                    location: {
                        href: ''
                    }
                };
            });

            it('should ', () => {
                const loc = 'some different page';

                global.changeLocation(loc);
                expect(global.view.location.href).toEqual(loc);
            });
        });
    });
});
