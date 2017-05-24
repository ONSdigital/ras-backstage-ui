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
        return Observable.of(`eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.srmjoWa_zujmN7R1sWEwHUdLaWRh2oMjkIUk4RJv8yX3rxlDdt5y142seiJgTDZu2nxY4XtOeukFWPOy3lOtOpSV6Wl-Fwh_riJ722_hs9nOZeqXNS5bmQqUdb2Zo0spL5nnhHU_E4sNuYo5mNaQE_bk0ZojLWuzd1APx3xdspMSagYngEkhRrmWq7XFedXpmUfgcURSXQhA01x3rt66grKe2lkUlgmwCoeFjPWzin4KmDiLsxbj2-xjGQQg8llOsVkFH70KZ7bxUvL0F1bQg5rvLGwiauQKrsI-Sza_5PX30myeMgJEEMyQkpZYIn6yN-wjCQjh9byrhCOm6Lm7Og.BWf3uZXGWJFUICa4.WJbXuQJTmVpXdPPFeTnnLTgfusbJHEV8hpFm0LZJIn48CzQJRQVbmRkPsCVtSTqn1-CvwQZpgk9eJLcb8G_-n_7AIfDXx2gvG-Rj7K93dRXuhVB1-mFrAZV7LGbHMVJnUli-1OBq0jcHD5UDQlyM7WQ1J7VD6EsJ2r-L1xE.KQvo3k1-NFfH578n5qm0aA`);
    }
}
