import { Component } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'home-page',
    templateUrl: 'dist/html/components/home/home-page/home-page.component.html',
    styleUrls: ['dist/css/components/home/home-page/home-page.component.css']
})
export class HomePageComponent {
      constructor(private authService: AuthService){}
}