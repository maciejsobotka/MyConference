import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { MdDialog } from '@angular/material';

import { EventDetailComponent } from '../event-detail/event-detail.component';
import { IEvent } from '../../../shared/models/event';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
    selector: 'event-personal-page',
    templateUrl: 'dist/html/components/event/event-personal-page/event-personal-page.component.html',
    styleUrls: ['dist/css/components/event/event-personal-page/event-personal-page.component.css']
})
export class EventPersonalPageComponent implements OnInit {
    private eventsUrl: string = 'api/UserEventsApi';
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
        this.getEventes().subscribe(
            evnts => {
                this.Events = evnts;
                if (this.AnyEvents) {
                    this.groupEvents();
                }
            },
            err => console.log(err));

    }

    getEventes(): Observable<IEvent[]> {
        return this.http.get(this.eventsUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    private groupEvents() {
        let date = this.Events[0].Date;
        let events = new Array<IEvent>();
        let group = new GroupedEvents();
        for (var event of this.Events) {
            if (event.Date !== date) {
                group.GroupingValue = date;
                group.Events = events;
                this.groupedEvents.push(group);
                events = [];
                group = new GroupedEvents();
                date = event.Date;
            }
            events.push(event);
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

    constructor(private http: Http, public dialog: MdDialog) {
        this.Events = new Array<IEvent>();
        this.groupedEvents = new Array<GroupedEvents>();
    }

}

export class GroupedEvents {
    GroupingValue: Date;
    Events: IEvent[];

    constructor() {
        this.Events = new Array<IEvent>();
    }
}