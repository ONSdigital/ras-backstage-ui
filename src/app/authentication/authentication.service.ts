import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { environment } from '../../environments/environment';
import { handleError, printResponse, global } from '../shared/utils';

@Injectable()
export class AuthenticationService {

    /**
     * Store router for decorator - bad, no access to DI instances in decorators
     */
    static routerCache: any;

    static BASE_URL = environment.endpoints.authentication;

    public encryptedHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    constructor(
        private http: Http,
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        this.init();
    }

    public init() {

        AuthenticationService.routerCache = this.router;

        const token = window.sessionStorage.getItem('token');

        if (token) {
            this.encryptedHeaders.set('Authorization', token);
        }
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
        .do(printResponse.bind(this, 'Authenticate credentials'))
        .catch(handleError)
        .share();

        observable.subscribe(
            (res: any) => {
                const token = res.json().token;

                if (token) {
                    /**
                     * Attach authentication token
                     */
                    window.sessionStorage.setItem('token', token);
                    this.encryptedHeaders.set('Authorization', token);

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
        return !!this.encryptedHeaders.get('Authorization');
    }
}

/**
 * Decorator
 */
export function CheckRequestAuthenticated(): Function {

    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): void {

        const method = descriptor.value;

        descriptor.value = function<T> (): Observable<T> {

            const call: Observable<T> = method.apply(this, arguments)
                .share();

            /**
             * Check the request was authenticated
             */
            call.subscribe(
                () => {},
                (error: any) => {

                    if (error.response &&  error.response.status === 401) {

                        console.log('Unauthorised request: ', error);

                        const router = AuthenticationService.routerCache;

                        if (router) {
                            router.navigate(['/sign-in'], {
                                queryParams: {
                                    returnUrl: router.url
                                }
                            });
                        } else {
                            global.changeLocation('/sign-in');
                        }
                    }
                }
            );

            return call;
        };
    };
}
