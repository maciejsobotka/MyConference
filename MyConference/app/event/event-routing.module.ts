import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';

const routes: Routes = [{
    path: 'event',
    component: EventPageComponent,
    data: {
        icon: 'event',
        title: 'Event Calendar'
    }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
