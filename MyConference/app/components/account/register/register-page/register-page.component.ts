import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../shared/services/auth.service';
import { DataHelper } from '../../../../shared/utils/data-helper';


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
            .subscribe(() => {
                this.http.post('/api/UsersApi', JSON.stringify({ Id: 0, Name: registerData.Email }),
                    new RequestOptions({ headers: this.headers }))
                    .subscribe(() => { },
                    error => this.formError = error.json().error_description);
                this.http.post('/Token',
                        "userName=" + encodeURIComponent(this.form.value.email) + "&password=" + encodeURIComponent(this.form.value.password) + "&grant_type=password",
                        new RequestOptions({ headers: this.headers }))
                    .subscribe(res => {
                        this.authService.setToken(res.json());
                        this.router.navigate(['/home']);
                    }, error => this.formError = error.json().error_description);
            }, error => {
                var errorBody = error.json();
                if (DataHelper.hasValue(errorBody.ModelState['model.Password'])) {
                    this.formError = errorBody.ModelState['model.Password'][0];
                }
                if (DataHelper.hasValue(errorBody.ModelState[''])) {
                    this.formError = error.json().ModelState[''][0];
                }
            });
    }

    constructor(private http: Http, private router: Router, private authService: AuthService) {}
}