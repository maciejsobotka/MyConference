import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppToolbarService, MenuItem } from './app-toolbar/app-toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: '/dist/html/app.component.html',
  styleUrls: ['/dist/css/app.component.css']
})
export class AppComponent {
    appName = 'My Conference';
    mainMenuItems;
    activeMenuItem$: Observable<MenuItem>;

    constructor(private toolbarService: AppToolbarService) {
        this.mainMenuItems = this.toolbarService.getMenuItems();
        this.activeMenuItem$ = this.toolbarService.activeMenuItem$;
    }
}
