import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../shared/app-common.module';

import { EventRoutingModule } from './event-routing.module';
import { EventPageComponent } from './event-page/event-page.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventPersonalPageComponent } from './event-personal-page/event-personal-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    EventRoutingModule
  ],
  declarations: [
      EventPageComponent,
      EventDetailComponent,
      EventPersonalPageComponent
  ],
  exports: [
      EventPageComponent,
      EventDetailComponent
  ],
  entryComponents: [EventDetailComponent]
})
export class EventModule { }
