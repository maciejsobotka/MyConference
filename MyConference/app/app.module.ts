import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppCommonModule } from './app-common/app-common.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppToolbarService } from './app-toolbar/app-toolbar.service';
import { HomeModule } from './home/home.module';
import { EventModule } from './event/event.module';
import { LoginModule } from './login/login.module';

import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppCommonModule,
        AppRoutingModule,
        HomeModule,
        EventModule,
        LoginModule,
        RouterModule.forRoot([{
            path: '', redirectTo: '/home', pathMatch: 'full'
        }])
    ],
    providers: [AppToolbarService],
    bootstrap: [AppComponent]
})
export class AppModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);