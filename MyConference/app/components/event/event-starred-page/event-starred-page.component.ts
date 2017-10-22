import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AuthService } from '../../../shared/services/auth.service';
import { EventsDataService } from '../../../shared/services/events-data.service';
import { ArrayHelper } from '../../../shared/utils/array-helper';

import { IEvent } from '../../../shared/models/event';
import { GroupedEvents } from '../../../shared/models/grouped-events';

import { EventDetailComponent } from '../event-detail/event-detail.component';


@Component({
    selector: 'event-starred-page',
    templateUrl: 'dist/html/components/event/event-starred-page/event-starred-page.component.html',
    styleUrls: ['dist/css/components/event/event-starred-page/event-starred-page.component.css']
})
export class EventStarredPageComponent implements OnInit {
    private events: IEvent[];
    private groupedEvents: GroupedEvents[];

    get AnyEvents(): boolean {
        return this.Events.length > 0;
    }

    get Events(): IEvent[] {
        return this.events;
    };

    set Events(value: IEvent[]) {
        if (value !== null) {
            this.events = value;
        }
    }

    flexLength(index: number): number {
        return 100/ this.groupedEvents[index].Events.length;
    }

    ngOnInit(): void {
        this.eventsDataService.getStarredEventes(this.authService.getToken().userName)
            .subscribe(evnts => {
                this.Events = evnts;
                if (this.AnyEvents) {
                    this.Events.forEach(e => e.IsStarred = true);
                    this.groupEvents();
                }
            });
    }

    private groupEvents() {
        let dates = this.Events.map(e => e.Date);
        let uniqDates = ArrayHelper.getUniqeValues(dates);

        for (let date of uniqDates) {
            let group = new GroupedEvents();
            group.GroupingValue = date;
            group.Events = this.Events.filter(e => e.Date === date);
            this.groupedEvents.push(group);
        }
    }

    openDialog(data: IEvent): void {
        let dialogRef = this.dialog.open(EventDetailComponent, {
            width: '80vw',
            data: data
        });

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }

    constructor(public dialog: MdDialog, private eventsDataService: EventsDataService, private authService: AuthService) {
        this.Events = new Array<IEvent>();
        this.groupedEvents = new Array<GroupedEvents>();
    }
}