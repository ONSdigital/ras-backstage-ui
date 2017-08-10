import { Observable } from 'rxjs/Rx';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationService {

    // static BASE_URL = environment.endpoints.?;

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    public encryptedHeaders = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    constructor(
        private http: Http) {}

    public getToken(): Observable<any> {
        /**
         * Internal user
         */
        /* tslint:disable */ return Observable.of(`eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJwYXJ0eV9pZCI6IkJSRVMiLCJyb2xlIjoiaW50ZXJuYWwifQ.UkdnLUQCax-11778hMcpuaZmmLHt31s9Tw9v46gG6ro`);
        /* tslint:disable */ // return Observable.of(`eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.eFOkp_zMq0JIqKNhGJ0MVT-PBoRkvco9XlSANn420WtPFuVgIKZ_B9RVjzrJD70HehO-BiSMGaasuXCSUXDBRmVJGrVnd0E9dYjhSBU1bi3xuOlsajJKc5cIfsjxAyPfUObUoRI3iCTwNCo_xHfHEbdwnocmUsrjUSckVk0zg6fgXvBeP7P6WsJmSJkLjsyD9I9Ju2k8YjuTpFXCJ6m12zDpfymr5Lm1kldesf0DDeG4QSI_N-FjzQgusfmcqylK8yiZ6y6C5Up6v6hgK8-xZ7YTHYnNgDdizZFo-GcDMgOuNOxRnQxp-PAvdJfMlCEW6u9dkhCGxaEWPBpDiivIAw.BGF5Igg_I_xp7Wy0.d3h1ZEwOBuWWry_dZEsavDAVdNUNrZwej8SFsFMwT_REKw24pWwOPAvOXCOaYxZTGPGfSJ6DWwyd7OrSSkw1alGVuhkk5cs8MJDVFdOf1ZiZnFJonjQVqxWTPJWCrJZABdeExN2MPVNKMlnZTfXYGAZNA5HJHc7EN30YA4PpIb-TVVC0.ntehgZobJV3kHysqsyf57A`);
        /* tslint:disable */ // return Observable.of(`eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.auofNVla9OQ2Vg8ltbrDS8iUk2mnqGFWxb3kgHPeJnQPQWNvLQ6rmF5SectKqVtQVlNBHVaxcY-igOCs2zWhJJ6OoiDc6uQS2n5ZixKAk2_gMA0g3Cs24D3-71J79ountAjHFRQmw4gewyKFoRf_7fk9UvZ02Ifrv2lX7Y-uKnNLVhTMH2I5pkRytgMwDmy35ogH6IIE4UxJ1KN6fZHZcVcLqNEOrjctegU_eywwsWBQ8SxGEjDL1LcIoHsZFmKlOdAFQ3Mk8ejKnwjs1TfElhRYOMaMzfoTfPhrPG5UC79PK18yQjfCxD2TPdO3wu1LJptprpp0Kbt4N4V8FZ4Opg.TpJFpLu0SuOFzjTJ.jrDd4qxFm5DjkV35j27ASedEnpP35ThfAubnk87loFmdHpg42zkH42pn8J777w_6o3aSbJ8i4YLY4IBsqztoRMeIviIEGMO_2CwmP_lt3xock6g1QFQrRS6xiRq4B8MFWwT7EDVQ-lWQm4Bc4KYIP0FMSrBM_toS1QdS4xOfHVAxnUBOrudt5B-25AhQRv8UWKX07UlDIZTjDp5d3062cE5A3yOlwTGxUGqTmywz0g.n3FO621BbJLyEGE9JNaH-A`);

        /**
         * Respondent
         */
        /*tslint:disable */ // return Observable.of('eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.XMrQ2QMNcoWqv6Pm4KGPZRPAHMSNuCRrmdp-glDvf_9gDzYDoXkxbZEBqy6_pdMTIFINUWUABYa7PdLLuJh5uoU9L7lmvJKEYCq0e5rS076KLRc5pFKHJesgJLNijj7scLke3y4INkd0px82SHhnbek0bGLeu3i8FgRt4vD0Eu8TWODM7kEfAT_eRmvPBM1boyOqrpyhYgE9p0_NklwloFXdYZKjTvHxlHtbiuYmvXSTFkbbp_t8T1xZmDrfgS2EDWTFEagzyKBFFAH4Z5QRUUJPiuAxI3lSNS2atFFtDWiZRhuuhRyJzNA4vqTpmFPUE6h_iggkcbiUPofSBx3CUw.QK4lX7z2vN6jryJz.G9C1zoAvWHfAJywiuijq6E78xCMZ5NOAZD1g3e6PTWhveQKNecBJAPgXyRDVgljgIwSq_vBY2AVTIE5xWapwF3oLZyiC0T0H2LrjlpKFUa51-VU_-Yj8u4ax0iLvyWyRRepQneYJ0riF4zbmcGf1vCCEO3WOwcD5wXBFVXVH6wPqExmI2tjWWLdz2F7oK1Wnh1pbQX_EW5rYb2I4mPuc2J6ijXAr73qcJLAzJbjDo1uk.QrPCckVYuNlcWeCwQmws9A');
    }

    public authenticate(request: any) {

        let isAuthenticated: Boolean = !!this.isAuthenticated();

        return isAuthenticated
            ? request()
            : this.getToken()
                .flatMap((token: string) => {

                    if (!isAuthenticated) {
                        this.encryptedHeaders.append('Authorization', token);
                    }

                    return request();
                })
                .share();
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

        /**
         * Check the request was authenticated
         */
        const method = descriptor.value;

        descriptor.value = function () {

            const call = method.apply(this, arguments)
                .share();

            call.subscribe(
                () => {},
                (error: any) => {

                    console.log();

                    /**
                     * TODO - redirect user to basic auth page
                     */
                    if (error.response.status === 401) {

                        console.log('Unauthorized request: ', error);
                        window.location.href = 'http://www.google.com';
                    }
                }
            );

            return call;
        };
    };
}
