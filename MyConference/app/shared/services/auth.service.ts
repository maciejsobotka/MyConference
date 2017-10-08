import { Injectable } from '@angular/core';
import { DataHelper } from '../utils/data-helper';

@Injectable()
export class AuthService {
    get isAuthorized(): boolean {
        return DataHelper.hasValue(sessionStorage.getItem('token'));
    }

    logIn(token: string) {
        sessionStorage.setItem('token', token);
    }

    logOut() {
        sessionStorage.removeItem('token');
    }
}