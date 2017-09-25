import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'login-page',
    templateUrl: 'dist/html/account/login/login-page/login-page.component.html',
    styleUrls: ['dist/css/account/login/login-page/login-page.component.css']
})
export class LoginPageComponent {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    private email: string;
    private password: string;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', Validators.required);

    login() {
        this.http.post('/Token', "userName=" + encodeURIComponent(this.email) +
            "&password=" + encodeURIComponent(this.password) +
            "&grant_type=password",
            new RequestOptions({ headers: this.headers })).subscribe();
    }

    constructor(private http: Http) {
        
    }
}