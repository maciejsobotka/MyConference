import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';

import { SessionHelper } from '../../../utils/session-helper';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'login-page',
    templateUrl: 'dist/html/account/login/login-page/login-page.component.html',
    styleUrls: ['dist/css/account/login/login-page/login-page.component.css']
})
export class LoginPageComponent {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    formError: string;

    form = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.pattern(EMAIL_REGEX) ]),
        password: new FormControl('', Validators.required)
    });

    login() {
        this.formError = null;
        if (this.form.valid) {
            this.http.post('/Token',
                "userName=" + encodeURIComponent(this.form.value.email) + "&password=" + encodeURIComponent(this.form.value.password) + "&grant_type=password",
                new RequestOptions({ headers: this.headers }))
                .subscribe(res => {
                    SessionHelper.logIn(res.json());
                    this.router.navigate(['/home']);
                }, error => this.formError = error.json().error_description);
        }
    }

    constructor(private http: Http, private router: Router) {
        this.formError = null;
    }
}