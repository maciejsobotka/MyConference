import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'login-page',
    templateUrl: 'dist/html/login/login-page/login-page.component.html',
    styleUrls: ['dist/css/login/login-page/login-page.component.css']
})
export class LoginPageComponent {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private email: string;
    private password: string;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)]);

    passwordFormControl = new FormControl('', Validators.required);

    login() {
        console.log('in');
        return this.http.post('Account/Login', JSON.stringify({ Email: this.email, Password: this.password }))
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    constructor(private http: Http) {
        
    }
}