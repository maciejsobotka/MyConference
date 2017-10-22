import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../../shared/services/auth.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'login-page',
    templateUrl: 'dist/html/account/login/login-page/login-page.component.html',
    styleUrls: ['dist/css/account/login/login-page/login-page.component.css']
})
export class LoginPageComponent{
    formError: string;

    form = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.pattern(EMAIL_REGEX) ]),
        password: new FormControl('', Validators.required)
    });

    login() {
        this.formError = null;
        this.authService.logIn(this.form.value.email, this.form.value.password)
            .subscribe(res => {
                this.authService.setToken(res.json());
                this.router.navigate(['/home']);
            }, error => this.formError = error.json().error_description);
    }

    constructor(private router: Router, private authService: AuthService) {
        this.formError = null;
    }
}