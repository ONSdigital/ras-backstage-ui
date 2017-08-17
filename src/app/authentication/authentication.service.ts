import { Observable } from 'rxjs/Rx';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, ResponseOptions, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    /**
     * Store router for decorator - bad, no access to DI instances in decorators
     */
    static routerCache: any;

    static BASE_URL = environment.endpoints.authentication;

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    public encryptedHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    constructor(
        private http: Http,
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        AuthenticationService.routerCache = this.router;
    }

    /**
     * User authentication
     * @param username
     * @param password
     * @returns {Observable<T>}
     */
    public authenticateCredentials(username: string, password: string): Observable<any> {

        const observable = this.http.post(
            AuthenticationService.BASE_URL + 'sign-in',
            { username, password },
            new RequestOptions({
                method: RequestMethod.Post
            })
        )
        .do((res: Response) => {
            console.log('Authenticate credentials: ', res);
        })
        .catch((response: any) => {
            console.log('Error response: ', response);
            return Observable.throw({ errorMessage: response._body, response });
        })
        .share();

        observable.subscribe(
            (res: any) => {
                const token = res.json().token;

                if (token) {
                    /**
                     * Attach authentication token
                     */
                    this.encryptedHeaders.append('Authorization', token);

                    const returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;

                    /**
                     * Navigate to returnUrl
                     */
                    this.router.navigateByUrl(returnUrl || '/');
                } else {
                    console.log('Problem retrieving token from successful response');
                }
            },
            (err: any) => console.log('Bad request: ', err)
        );

        return observable;
    }

    public isAuthenticated() {
        return this.encryptedHeaders.get('Authorization');
    }
}

/**
 * Decorator
 */
export function CheckRequestAuthenticated() {

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

                    if (error.response.status === 401) {

                        const router = AuthenticationService.routerCache;

                        if (router) {
                            this.router.navigate(['/sign-in'], {
                                queryParams: {
                                    returnUrl: router.url
                                }
                            });
                        } else {
                            console.log('Unauthorized request: ', error);
                            window.location.href = '/sign-in';
                        }
                    }
                }
            );

            return call;
        };
    };
}
