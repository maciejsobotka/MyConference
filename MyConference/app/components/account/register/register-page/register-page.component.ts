import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../shared/services/auth.service';
import { DataHelper } from '../../../../shared/utils/data-helper';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'register-page',
    templateUrl: 'dist/html/components/account/register/register-page/register-page.component.html',
    styleUrls: ['dist/css/components/account/register/register-page/register-page.component.css']
})
export class RegisterPageComponent {
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

        this.authService.register(registerData)
            .subscribe(() => { this.authService.registerUser(registerData.Email)
                    .subscribe(() => { },
                    error => this.formError = error.json().error_description);
                this.authService.logIn(this.form.value.email, this.form.value.password)
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

    constructor(private router: Router, private authService: AuthService) {}
}