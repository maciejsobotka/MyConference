import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../shared/app-common.module';

import { EventRoutingModule } from './event-routing.module';
import { EventPageComponent } from './event-page/event-page.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventStarredPageComponent } from './event-starred-page/event-starred-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    EventRoutingModule
  ],
  declarations: [
      EventPageComponent,
      EventDetailComponent,
      EventStarredPageComponent
  ],
  exports: [
      EventPageComponent,
      EventDetailComponent
  ],
  entryComponents: [EventDetailComponent]
})
export class EventModule { }
