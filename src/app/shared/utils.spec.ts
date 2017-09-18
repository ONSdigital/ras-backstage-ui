import {
    Response,
    ResponseOptions
} from '@angular/http';

import { isFunction, validateProperties, validationOutput, printResponse, handleError } from './utils';

const originalConsole: any = console.log;

describe('utils', () => {

    beforeEach(() => {
        spyOn(console, 'log');
    });

    afterEach(() => {
        console.log = originalConsole;
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
});
