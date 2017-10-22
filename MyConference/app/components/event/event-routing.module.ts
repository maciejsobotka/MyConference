import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';
import { EventStarredPageComponent } from './event-starred-page/event-starred-page.component';

const routes: Routes = [{
        path: 'event',
        component: EventPageComponent,
        data: {
            icon: 'event',
            title: 'Event Calendar'
        }
    },
    {
        path: 'event-starred',
        component: EventStarredPageComponent,
        data: {
            icon: 'event',
            title: 'Your Event Calendar',
            authRequired: true
        }
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
