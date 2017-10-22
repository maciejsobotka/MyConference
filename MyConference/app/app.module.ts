import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AppCommonModule } from './shared/app-common.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './components/home/home.module';
import { EventModule } from './components/event/event.module';
import { LoginModule } from './components/account/login/login.module';
import { RegisterModule } from './components/account/register/register.module';

import { ToolbarService } from './shared/services/toolbar.service';
import { EventsDataService } from './shared/services/events-data.service';
import { AuthService } from './shared/services/auth.service';

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
        RegisterModule
    ],
    providers: [
        ToolbarService,
        EventsDataService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);