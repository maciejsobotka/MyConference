import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ToolbarService } from './shared/services/toolbar.service';
import { AuthService } from './shared/services/auth.service';

import { IMenuItem } from './shared/models/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: '/dist/html/app.component.html',
  styleUrls: ['/dist/css/app.component.css']
})
export class AppComponent{

    activeMenuItem$: Observable<IMenuItem>;
    appName: string = 'My Conference';
    mainMenuItems: any;
    isAuthorized: boolean;

    logOut() {
        this.authService.logOut().subscribe(() => this.authService.removeToken());
    }

    constructor(private authService: AuthService, private toolbarService: ToolbarService) {
        this.mainMenuItems = this.toolbarService.getMenuItems();
        this.activeMenuItem$ = this.toolbarService.activeMenuItem$;

        document.getElementById('loader').style.display = "none";
    }
}
