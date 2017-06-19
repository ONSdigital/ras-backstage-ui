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
        return Observable.of(`eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ.auofNVla9OQ2Vg8ltbrDS8iUk2mnqGFWxb3kgHPeJnQPQWNvLQ6rmF5SectKqVtQVlNBHVaxcY-igOCs2zWhJJ6OoiDc6uQS2n5ZixKAk2_gMA0g3Cs24D3-71J79ountAjHFRQmw4gewyKFoRf_7fk9UvZ02Ifrv2lX7Y-uKnNLVhTMH2I5pkRytgMwDmy35ogH6IIE4UxJ1KN6fZHZcVcLqNEOrjctegU_eywwsWBQ8SxGEjDL1LcIoHsZFmKlOdAFQ3Mk8ejKnwjs1TfElhRYOMaMzfoTfPhrPG5UC79PK18yQjfCxD2TPdO3wu1LJptprpp0Kbt4N4V8FZ4Opg.TpJFpLu0SuOFzjTJ.jrDd4qxFm5DjkV35j27ASedEnpP35ThfAubnk87loFmdHpg42zkH42pn8J777w_6o3aSbJ8i4YLY4IBsqztoRMeIviIEGMO_2CwmP_lt3xock6g1QFQrRS6xiRq4B8MFWwT7EDVQ-lWQm4Bc4KYIP0FMSrBM_toS1QdS4xOfHVAxnUBOrudt5B-25AhQRv8UWKX07UlDIZTjDp5d3062cE5A3yOlwTGxUGqTmywz0g.n3FO621BbJLyEGE9JNaH-A`);
    }
}
