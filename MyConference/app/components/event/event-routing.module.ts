import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';
import { EventPersonalPageComponent } from './event-personal-page/event-personal-page.component';

const routes: Routes = [{
        path: 'event',
        component: EventPageComponent,
        data: {
            icon: 'event',
            title: 'Event Calendar'
        }
    },
    {
        path: 'event-personal',
        component: EventPersonalPageComponent,
        data: {
            icon: 'event',
            title: 'Your Event Calendar'
        }
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
