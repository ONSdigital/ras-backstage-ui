import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

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

export function isFunction(obj: any) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

export function validateProperties (entity: Object, constraints: Array<Constraint>) {
    const failedValidation = constraints.filter((constraint: any) => entity[constraint.propertyName] === undefined);

    failedValidation.forEach((constraint: any) => validationOutput({
        notification: 'Property ' + constraint.propertyName + ' missing',
        subject: entity
    }));

    return failedValidation.length ? failedValidation : false;
}

export function validationOutput (err: ValidationError) {
    console.log(err.notification);

    if (err.subject) {

        if (err.subjectLabel) {
            console.log(err.subjectLabel, err.subject);
        } else {
            console.log('Error subject: ', err.subject);
        }
    }
}

export function attachBadRequestCheck (options: any): void {

    const { observable, errorHeading, serviceInstance, serviceClass } = options;

    observable.subscribe(
        () => {},
        (err: any) => {
            console.log('Bad request: ', err);
            serviceInstance.router.navigate(['/server-error'], {
                queryParams: {
                    errorResponseCode: err.response.status,
                    errorHeading: errorHeading,
                    errorBody: serviceClass.label + ' error: ' + err.errorMessage
                }
            });
        }
    );
}

/**
 * Decorator
 */
export function CheckBadRequest(options: any) {

    const { errorHeading, serviceClass } = options;

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
                            console.log('Bad request: ', error);
                            window.location.href = '/server-error?errorResponseCode=' + error.response.status +
                                '&errorHeading=' + errorHeading + '&errorBody=' + serviceClass.label + ' error: ' +
                                error.errorMessage;
                        }
                    }
                }
            );

            return call;
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
