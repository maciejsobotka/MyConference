import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../shared/app-common.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    HomeRoutingModule
  ],
  declarations: [HomePageComponent],
  exports: [
      HomePageComponent
  ]
})
export class HomeModule { }
