import { Component } from '@angular/core';

import { SessionHelper } from '../../utils/session-helper';

@Component({
    selector: 'home-page',
    templateUrl: 'dist/html/home/home-page/home-page.component.html',
    styleUrls: ['dist/css/home/home-page/home-page.component.css']
})
export class HomePageComponent {
    get isAuthorized(): boolean {
        return SessionHelper.isAuthorized();
    }
}