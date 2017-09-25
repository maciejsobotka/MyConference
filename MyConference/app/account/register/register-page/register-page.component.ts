import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'register-page',
    templateUrl: 'dist/html/account/register/register-page/register-page.component.html',
    styleUrls: ['dist/css/account/register/register-page/register-page.component.css']
})
export class RegisterPageComponent {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private email: string;
    private password: string;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', Validators.required);

    register() {
        var registerData = {
            Email: this.email,
            Password: this.password,
            ConfirmPassword: this.password
        }

        this.http.post('/api/Account/Register', JSON.stringify(registerData),
            new RequestOptions({ headers: this.headers })).subscribe();
    }

    constructor(private http: Http) {
        
    }
}