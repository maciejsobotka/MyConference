import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { IMenuItem } from '../models/menu-item';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class ToolbarService {
    activeMenuItem$: Observable<IMenuItem>;

    constructor(private router: Router, private titleService: Title) {
        this.activeMenuItem$ = this.router.events
            .filter(e => e instanceof NavigationEnd)
            .map(() => this.router.routerState.root)
            .map(route => {
                let active = this.lastRouteWithMenuItem(route.root);
                this.titleService.setTitle(active.title);
                return active;
            });
    }

    getMenuItems(): IMenuItem[] {
        return this.router.config
            .filter(route => route.data && route.data.title)
            .map(route => {
                if (!route.data.title) {
                    throw new Error('Missing title for toolbar menu route ' + route.path);
                }
                return {
                    path: route.path,
                    title: route.data.title,
                    icon: route.data.icon,
                    hidden: route.data.hidden,
                    toolbarHidden: route.data.hiddenToolbar,
                    authRequired: route.data.authRequired
                };
            });
    }

    private lastRouteWithMenuItem(route: ActivatedRoute): IMenuItem {
        let lastMenu = undefined;
        do { lastMenu = this.extractMenu(route) || lastMenu; }
        while ((route = route.firstChild));
        return lastMenu;
    }

    private extractMenu(route: ActivatedRoute): IMenuItem {
        let cfg = route.routeConfig;
        return cfg && cfg.data
            ? {
                path: cfg.path,
                title: cfg.data.title,
                icon: cfg.data.icon,
                hidden: cfg.data.hidden,
                hiddenToolbar: cfg.data.hiddenToolbar,
                authRequired: cfg.data.authRequired
            }
            : undefined;
    }
}


