import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationService {

    // static BASE_URL = environment.endpoints.?;

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http) {}

    public getToken(): Observable<any> {
        return Observable.of(`eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.GXOO8DQItBlk9hO2Lve2G7vjD1AoEdmzrJVn6_woPhPGddNk9dtfUgbHDuCVoQrteTC8ux1zbKnn0VSCSaSIEF8kM-8WQirDTxWtm8F5i339dJk7eM3Bk6-BxQgMcgrSUrGDwjPuQBYaHEvRGPZccB4576JXX4zhBjaqKDYzD_57St5bC1Ve7k_N-97W3w2VqT33OtQdwS6qeDqXFc6DHCgJsvLMFztmJ1BTWzab9PejmWhLup5uBb9s0XWRyx12KcNXJtNuFxFM2z4FMJ2sWPeNqLbgcg8ECfJ0IrO-Cy4JuitphnWegaujpcFnuoZl-FQvHszZF6uoGsjOQUII5w.ll-4VbmGRJL-ROgi.41hFWh6SLlp-y6ZrquxSeNkABGQp_4E6Y5gVkTogTNMbXkDJ2Dd3PRcsp_heGTzD6DEygIW_fAqR4ekfpuLYb4oj5Iax5fUYJfhp1b-FyKIqOExuQoaDCWaisDrIglfLQQYtSsXF49mvRVapIzD9YtSW4FyEJVwYsS6YVykezkk._xidxqOPvdqGocscjyi2wQ`);
    }
}
