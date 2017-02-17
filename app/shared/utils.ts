export function uiComponentDecoratorHelper(opts: any) {

    var styleUrls = opts.styleUrls || [];
    opts.filename && styleUrls.push(opts.filename.replace('.js', '.css').replace(/^\//,""));

    /**
     * Supplement component metadata with automated values.
     */
    return Object.assign({},
        (opts.styleUrls || opts.filename) ? {
            styleUrls: opts.styleUrls ? opts.styleUrls : [(opts.filename ? opts.filename.replace('.js', '.css').replace(/^\//,"") : '')]
        } : undefined,

        (opts.templateUrl || opts.filename) ? {
            templateUrl: opts.templateUrl ? opts.templateUrl : (opts.filename ? opts.filename.replace('.js', '.html') : '')
        } : null,
        opts
    );
}
