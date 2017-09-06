import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [{
    path: 'login',
    component: LoginPageComponent,
    data: {
        icon: 'Login',
        title: 'Login Page',
        hidden: true,
        hiddenToolbar: true
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
