import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppToolbarService, MenuItem } from './app-toolbar/app-toolbar.service';


@Component({
  selector: 'app-root',
  templateUrl: '/dist/html/app.component.html',
  styleUrls: ['/dist/css/app.component.css']
})
export class AppComponent {

    activeMenuItem$: Observable<MenuItem>;
    appName: string = 'My Conference';
    mainMenuItems: any;

    constructor(private toolbarService: AppToolbarService) {
        this.mainMenuItems = this.toolbarService.getMenuItems();
        this.activeMenuItem$ = this.toolbarService.activeMenuItem$;
    }
}
