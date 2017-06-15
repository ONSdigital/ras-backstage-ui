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
        return Observable.of(`eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.tUu7F21SUGytChGevLy_QE6K977P12LS0sIEuZ0kmEHtUwUwGOK44eiPwg0tnyi7wIu3Gq_YON6W3rxtlwYp8bfYsRSzfkpoTo_600zANbRnlCyomJblCW0KW6HN75N2gSvlsxbSe64ifXQPga2mkH2HWRjYMv9uP1OBKZHz1B2h-3eiQUmWP44M4BhUolNwXrbLxmc-oYddUGNZtE9nl5aQ7dbeLP5_eceNxafWw-75-9cFEgePhLPqvYUCl7UOLJuZDfvrBT5XQs2AZ52GhCqi3SrPWci3tdSaKFrEBX5lBrq7NLlqlK3oq2mxd3gFXP6dMeJrbz5c5TbmUxnFbQ.DdHC-W06Ezj4gkAP.TdXfxVwA8mgYrAo1P-4sA6oGlZ9IFT0mcKfan_ZoXFCbCQRFkReuyK7cBiJByfh4cxJ5iOQhubXbp2s2MoGQBaHJPBlyD4hqr1lHyOY0ZDNoQOKc2B4_cAz8ueN1uuMPvCcLH1TTCXPDkAjPHcyLJCZwm95j.NEuuMPblS3AdozLTCG88LQ`);

        // return Observable.of(`eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.AYuVD7tqZLVRBD_r1L7DK25h2oBd2aTSdijU2FYM2oG46vpHY3hMfrNDaaptVklBFsb5X2S_VoaWuzduRU-hjNYDw3QwFqquQUv-sUrRS8OuHBaiWF0mH7H1Gg6J2B-Rl0bG-SZBwRzOX1cVxG2hNJPAA7sANXaIvIkZKv9e5ROiD6eO53dITDYtoNLI2CuNnZfshVj2SaZDDOgNW3khFT2iHfuFH1DwoGPSZ5K4OuC6J-SA_yQSXfwoN3sXywXAjK4MUaPSoaTYKTxxkjSv_k2FY4yIbnfC4Il22rwjz6tqwO_ehUk0anlRSx_l5HphkRLEywDWtGtAbB8RxKpxSQ.ye0Suv50dA82qREn.KGNXCVjXfYZaEenDkOWG713Ha0JB9uJSzZ95jM5q8NPueyHNLoiQy8Nq-VoT0fDfZSxGbbRyLY3xood-jDKySrAPC5LRh-k3erJF4JwrpAD1afCuVI5sGfpvyb9hDzi5r14FPoG2Y8rNNaTKsM6b1zbXAHFaDv-UeyO6S25PiPR3K4KFJb9v68qul2DVLS0y1-Ibqtg.yXRfHJW1UC9MC4SfKRuvIQ`);
    }
}
