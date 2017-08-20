import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
    selector: 'event-page',
    templateUrl: 'dist/html/event/event-page/event-page.component.html',
    styleUrls: ['dist/css/event/event-page/event-page.component.css']
})
export class EventPageComponent implements OnInit {
    private eventsUrl: string = 'api/EventsApi';
    private events: Event[];
    private groupedEvents: GroupedEvents[];

    get Events(): Event[] {
        return this.events;
    };

    set Events(value: Event[]) {
        if (value !== null) {
            this.events = value;
        }
    }

    get FlexLength(index: number): number {
        return 100/ this.groupedEvents[index].Events.length;
    }

    ngOnInit(): void {
        this.getEventes().subscribe(
            comments => {
                this.Events = comments;
                this.groupEvents();
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });

    }

    getEventes(): Observable<Event[]> {
        return this.http.get(this.eventsUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    private groupEvents() {
        let date = this.Events[0].Date;
        let events = new Array<Event>();
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

    constructor(private http: Http) {
        this.Events = new Array<Event>();
        this.groupedEvents = new Array<GroupedEvents>();
    }

}

export class Event {
    Name: string;
    Date: Date;
    StartTime: Date;
    EndTime: Date;
    Speaker: string;
    Topic: string;
    Chair: string;
    Location: string;
    Type: number;

    constructor() {
        this.Date = new Date();
        this.StartTime = new Date();
        this.EndTime = new Date();
    }
}

export class GroupedEvents {
    GroupingValue: Date;
    Events: Event[];

    constructor() {
        this.Events = new Array<Event>();
    }
}