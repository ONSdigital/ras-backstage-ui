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
        notification: 'Property ' + constraint.propertyName + ' missing'
    }));

    return failedValidation.length ? failedValidation : false;
}

export function validationOutput (err: ValidationError) {
    console.log(err.notification);

    if (err.subject) {
        console.log(err.subjectLabel ? err.subjectLabel + ' :' + err.subject : err.subject);
    }
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
