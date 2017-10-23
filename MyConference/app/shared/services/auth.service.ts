import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataHelper } from '../utils/data-helper';

@Injectable()
export class AuthService {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    private bodyHeaders = new Headers({ 'Content-Type': 'application/json' });

    get isAuthorized(): boolean {
        return DataHelper.hasValue(sessionStorage.getItem('token'));
    }

    getToken(): any {
        return JSON.parse(sessionStorage.getItem('token'));
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
        return this.http.post('/api/Account/Logout', null, { headers: new Headers({ 'Authorization': 'Bearer ' + this.getToken().access_token }) });
    }

    register(registerData): Observable<any> {
        return this.http.post('/api/Account/Register',
            JSON.stringify(registerData),
            new RequestOptions({ headers: this.bodyHeaders }));
    }

    registerUser(email: string): Observable<any> {
        return this.http.post('/api/UsersApi',
            JSON.stringify({ Id: 0, Name: email }),
            new RequestOptions({ headers: this.bodyHeaders }));
    }

    setToken(token: string) {
        sessionStorage.setItem('token', JSON.stringify(token));
    }
    
    removeToken() {
        sessionStorage.removeItem('token');
    }

    constructor(private http: Http){}
}