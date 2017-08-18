import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../app-common/app-common.module';

import { EventRoutingModule } from './event-routing.module';
import { EventPageComponent } from './event-page/event-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    EventRoutingModule
  ],
  declarations: [EventPageComponent],
  exports: [
      EventPageComponent
  ]
})
export class EventModule { }
