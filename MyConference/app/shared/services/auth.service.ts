import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataHelper } from '../utils/data-helper';

@Injectable()
export class AuthService {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    get isAuthorized(): boolean {
        return DataHelper.hasValue(sessionStorage.getItem('token'));
    }

    getToken(): any {
        return JSON.parse(sessionStorage.getItem('token'));
    }

    setToken(token: string) {
        sessionStorage.setItem('token', JSON.stringify(token));
    }

    logIn(email: string, password: string): Observable<any> {
        return this.http.post('/Token',
            "userName=" +
            encodeURIComponent(email) +
            "&password=" +
            encodeURIComponent(password) +
            "&grant_type=password",
            new RequestOptions({ headers: this.headers }));
    }

    logOut() {
        sessionStorage.removeItem('token');
    }

    removeToken() {
        sessionStorage.removeItem('token');
    }

    constructor(private http: Http){}
}