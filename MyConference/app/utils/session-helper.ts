import {DataHelper} from './data-helper';

export class SessionHelper {
    static isAuthorized(): boolean {
        return DataHelper.hasValue(sessionStorage.getItem('token'));
    }

    static logIn(token: string) {
        sessionStorage.setItem('token', token);
    }

    static logOut() {
        sessionStorage.removeItem('token');
    }
}