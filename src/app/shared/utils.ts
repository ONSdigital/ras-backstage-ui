import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Response } from '@angular/http';

/*export function uiComponentDecoratorHelper(opts: any) {

    var styleUrls = opts.styleUrls || [];
    opts.filename && styleUrls.push(opts.filename.replace('.js', '.css').replace(/^\//,""));

    /!**
     * Supplement component metadata with automated values.
     *!/
    return Object.assign({},
        (opts.styleUrls || opts.filename) ? {
            styleUrls: opts.styleUrls ? opts.styleUrls : [(opts.filename ? opts.filename.replace('.js', '.css').replace(/^\//,"") : '')]
        } : undefined,

        (opts.templateUrl || opts.filename) ? {
            templateUrl: opts.templateUrl ? opts.templateUrl : (opts.filename ? opts.filename.replace('.js', '.html') : '')
        } : null,
        opts
    );
}*/

export function isFunction(obj: any): Boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

export function validateProperties (entity: Object, constraints: Array<Constraint>): Array<Constraint> | Boolean {

    if (!entity || !constraints || !constraints.length) {
        return;
    }

    const failedValidation = constraints.filter((constraint: any) => entity[constraint.propertyName] === undefined);

    failedValidation.forEach((constraint: any) => validationOutput({
        notification: 'Property ' + constraint.propertyName + ' missing',
        subject: entity
    }));

    return failedValidation.length ? failedValidation : false;
}

export function validationOutput (err: ValidationError): void {
    console.log(err.notification);

    if (err.subject) {

        if (err.subjectLabel) {
            console.log(err.subjectLabel, err.subject);
        } else {
            console.log('Error subject: ', err.subject);
        }
    }
}

export function printResponse (printStatement: string, res: Response): void {
    console.log(printStatement + ': ', res);
}

export function handleError (response: any): Observable<any> {
    console.log('Error response: ', response);
    return Observable.throw({ errorMessage: response._body, response });
}

const defaultGlobalView: any = window;

export const global = {
    changeLocation(loc: string) {
        this.view.location.href = loc;
    },
    validateProperties: validateProperties,
    validationOutput: validationOutput,
    view: defaultGlobalView
};


/**
 * Decorator
 */
export function CheckBadRequest(options: any) {

    const { errorHeading, serviceClass } = options;

    if (!errorHeading || !serviceClass) {
        throw new Error('Invalid configuration of CheckBadRequest. Require errorHeading, serviceClass properties');
    }

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {

        const method = descriptor.value;

        descriptor.value = function () {

            const call = method.apply(this, arguments)
                .share();

            /**
             * Check the request was authenticated
             */
            call.subscribe(
                () => {},
                (error: any) => {

                    if (error.response.status !== 401) {

                        console.log('Bad request: ', error);

                        const router = AuthenticationService.routerCache;

                        if (router) {
                            router.navigate(['/server-error'], {
                                queryParams: {
                                    errorResponseCode: error.response.status,
                                    errorHeading: errorHeading,
                                    errorBody: serviceClass.label + ' error: ' + error.errorMessage
                                }
                            });
                        } else {
                            global.changeLocation('/server-error?errorResponseCode=' + error.response.status +
                                '&errorHeading=' + errorHeading + '&errorBody=' + serviceClass.label + ' error: ' +
                                error.errorMessage);
                        }
                    }
                }
            );

            return call;
        };
    };
}

/**
 * Decorator
 */
export function HandleCommonRequest(options: any) {

    const { printStatement } = options;

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {

        const method = descriptor.value;

        descriptor.value = function () {

            return method.apply(this, arguments)
                .do(printResponse.bind(null, printStatement))
                .catch(handleError)
                .share();
        };
    };
}

interface Constraint {
    propertyName: string;
    errorMessage?: string;
}

interface ValidationError {
    notification: string;
    subjectLabel?: string;
    subject?: any;
}
