import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';

import { DataHelper } from '../../../common/data-helper';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'register-page',
    templateUrl: 'dist/html/account/register/register-page/register-page.component.html',
    styleUrls: ['dist/css/account/register/register-page/register-page.component.css']
})
export class RegisterPageComponent {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    formError: string;

    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
        password: new FormControl('', Validators.required)
    });

    register() {
        var registerData = {
            Email: this.form.value.email,
            Password: this.form.value.password,
            ConfirmPassword: this.form.value.password
        }

        this.http.post('/api/Account/Register', JSON.stringify(registerData),
            new RequestOptions({ headers: this.headers }))
            .subscribe(res => { }, error => {
                var errorBody = JSON.parse(error['_body']);
                if (DataHelper.hasValue(errorBody.ModelState['model.Password'])) {
                    this.formError = JSON.parse(error['_body']).ModelState['model.Password'][0];
                }
                if (DataHelper.hasValue(errorBody.ModelState[''])) {
                    this.formError = JSON.parse(error['_body']).ModelState[''][0];
                }
            });
    }

    constructor(private http: Http) {
        
    }
}