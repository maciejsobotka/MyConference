import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppToolbarService, MenuItem } from './app-toolbar/app-toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: '/dist/html/app.component.html',
  styleUrls: ['/dist/html/css/app.component.css']
})
export class AppComponent {
    appName = 'Ride Finder';
    isDarkTheme = true;
    mainMenuItems;
    activeMenuItem$: Observable<MenuItem>;

    toggleTheme(): void {
        this.isDarkTheme = !this.isDarkTheme;
    }

    constructor(private toolbarService: AppToolbarService) {
        this.mainMenuItems = this.toolbarService.getMenuItems();
        this.activeMenuItem$ = this.toolbarService.activeMenuItem$;
    }
}
